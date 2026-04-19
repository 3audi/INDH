export default async function handler(req, res) {
    // Only allow GET requests
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { cursor } = req.query;
    const PAGE_ID = process.env.VITE_FB_PAGE_ID;
    const ACCESS_TOKEN = process.env.VITE_FB_ACCESS_TOKEN;

    if (!PAGE_ID || !ACCESS_TOKEN) {
        return res.status(500).json({ error: 'Missing Meta API credentials' });
    }

    try {
        // Request fields: id, message, attached pictured, creation date
        let url = `https://graph.facebook.com/v19.0/${PAGE_ID}/posts?fields=id,message,full_picture,created_time,attachments{subattachments.limit(100),media_type,media}&access_token=${ACCESS_TOKEN}&limit=30&since=2022-01-04`;

        if (cursor) {
            url += `&after=${cursor}`;
        }

        const fbResponse = await fetch(url);
        const fbData = await fbResponse.json();

        if (fbData.error) {
            console.error("Graph API Error:", fbData.error);
            return res.status(500).json({ error: fbData.error.message });
        }

        // Filter posts to only those that have a picture or message
        const validPosts = fbData.data.filter(post => post.full_picture || post.message);

        // Fetch all paginated subattachments (images) for each post in parallel
        await Promise.all(validPosts.map(async (post) => {
            if (post.attachments && post.attachments.data && post.attachments.data.length > 0) {
                const attachment = post.attachments.data[0];
                if (attachment.subattachments && attachment.subattachments.paging && attachment.subattachments.paging.next) {
                    let nextUrl = attachment.subattachments.paging.next;
                    while (nextUrl) {
                        try {
                            const subRes = await fetch(nextUrl);
                            const subData = await subRes.json();
                            if (subData && subData.data) {
                                attachment.subattachments.data.push(...subData.data);
                                nextUrl = (subData.paging && subData.paging.next) ? subData.paging.next : null;
                            } else {
                                nextUrl = null;
                            }
                        } catch (err) {
                            console.error("Error fetching subattachments pagination:", err);
                            nextUrl = null;
                        }
                    }
                }
            }
        }));

        res.status(200).json({ data: validPosts, paging: fbData.paging });
    } catch (error) {
        console.error("Facebook API Fetch Error:", error);
        res.status(500).json({ error: 'Failed to fetch Facebook feed' });
    }
}
