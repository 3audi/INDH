import React, { useState } from 'react';
import { KeyRound, ShieldCheck } from 'lucide-react';
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = '' }) => (
    <div className={`bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl shadow-sm overflow-hidden ${className}`}>
        {children}
    </div>
);

const CardHeader: React.FC<{ title: string; icon?: any }> = ({ title, icon: Icon }) => (
    <div className="px-6 py-4 border-b border-black/5 dark:border-white/5 bg-gray-50/50 dark:bg-black/20 flex items-center gap-3">
        {Icon && <Icon size={16} className="text-void/60 dark:text-white/60" />}
        <h3 className="font-bold text-sm uppercase tracking-wider text-void/80 dark:text-white/80">{title}</h3>
    </div>
);

const FieldGroup: React.FC<{ label: string; children: React.ReactNode; className?: string }> = ({ label, children, className = "mb-4" }) => (
    <div className={className}>
        <label className="block text-xs font-bold text-void/50 dark:text-white/50 uppercase tracking-wider mb-2">{label}</label>
        {children}
    </div>
);

const Input: React.FC<React.InputHTMLAttributes<HTMLInputElement>> = (props) => (
    <input
        {...props}
        className="w-full bg-white dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm focus:border-m-green focus:ring-1 focus:ring-m-green outline-none transition-all text-void dark:text-white placeholder:text-void/20 dark:placeholder:text-white/20"
    />
);

export const SettingsPage: React.FC = () => {
    const [newUser, setNewUser] = useState('');
    const [newPass, setNewPass] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [credMsg, setCredMsg] = useState<{ type: 'ok' | 'err'; text: string } | null>(null);
    const [saving, setSaving] = useState(false);

    const saveCredentials = async () => {
        if (!newUser.trim() || !newPass) {
            setCredMsg({ type: 'err', text: 'Username and password cannot be empty.' });
            return;
        }
        if (newPass !== confirmPass) {
            setCredMsg({ type: 'err', text: 'Passwords do not match.' });
            return;
        }
        setSaving(true);
        try {
            const res = await fetch('/api/credentials', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: newUser.trim(), password: newPass })
            });
            const data = await res.json();
            if (data.success) {
                setCredMsg({ type: 'ok', text: 'Credentials updated! Use them on next login.' });
                setNewUser('');
                setNewPass('');
                setConfirmPass('');
            } else {
                setCredMsg({ type: 'err', text: data.error || 'Save failed.' });
            }
        } catch {
            setCredMsg({ type: 'err', text: 'Server unreachable. Make sure you run npm run dev.' });
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="max-w-lg mx-auto space-y-6">
            <Card className="border-l-4 border-l-gray-400">
                <CardHeader title="Change Admin Credentials" icon={KeyRound} />
                <div className="p-6 space-y-4">
                    <FieldGroup label="New Username">
                        <Input
                            value={newUser}
                            onChange={e => setNewUser(e.target.value)}
                            placeholder="Enter new username"
                            autoComplete="new-username"
                        />
                    </FieldGroup>
                    <FieldGroup label="New Password">
                        <input
                            type="password"
                            value={newPass}
                            onChange={e => setNewPass(e.target.value)}
                            placeholder="Enter new password"
                            autoComplete="new-password"
                            className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none transition-all text-void dark:text-white focus:border-m-green focus:ring-1 focus:ring-m-green tracking-widest"
                        />
                    </FieldGroup>
                    <FieldGroup label="Confirm Password">
                        <input
                            type="password"
                            value={confirmPass}
                            onChange={e => setConfirmPass(e.target.value)}
                            placeholder="Repeat new password"
                            autoComplete="new-password"
                            className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none transition-all text-void dark:text-white focus:border-m-green focus:ring-1 focus:ring-m-green tracking-widest"
                        />
                    </FieldGroup>
                    {credMsg && (
                        <div className={`text-sm rounded-lg px-4 py-2.5 font-medium ${credMsg.type === 'ok'
                            ? 'bg-m-green/10 text-m-green border border-m-green/20'
                            : 'bg-red-500/10 text-red-500 border border-red-500/20'
                            }`}>
                            {credMsg.type === 'ok' ? '✅' : '❌'} {credMsg.text}
                        </div>
                    )}
                    <button
                        onClick={saveCredentials}
                        disabled={saving}
                        className="w-full flex items-center justify-center gap-2 py-3 bg-m-green text-white rounded-xl font-bold hover:bg-green-700 transition-all disabled:opacity-60"
                    >
                        <ShieldCheck size={18} />
                        {saving ? 'Saving...' : 'Update Credentials'}
                    </button>
                    <p className="text-xs text-void/40 dark:text-white/40 text-center">
                        Credentials are saved to <code className="bg-black/10 dark:bg-white/10 px-1 py-0.5 rounded">data/credentials.json</code> on the server.
                    </p>
                </div>
            </Card>
        </div>
    );
};
