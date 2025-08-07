import React, {useEffect, useState} from 'react';
import {Button} from "~/components/ui/button";
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "~/components/ui/collapsible";
import {Switch} from "~/components/ui/switch";
import {Label} from "~/components/ui/label";
import {InfoIcon} from "lucide-react";

interface Preferences {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
}

interface CookieBannerProps {
    onAccept: (preferences: Preferences) => void;
    open?: boolean;
    onClose?: () => void;
}

const CookieBanner: React.FC<CookieBannerProps> = ({onAccept, open, onClose}) => {
    const [showBanner, setShowBanner] = useState(false);
    const [preferences, setPreferences] = useState<Preferences>({
        necessary: true,
        analytics: false,
        marketing: false,
    });

    useEffect(() => {
        if (typeof open === 'boolean') {
            setShowBanner(open);
            if (open) {
                // Preferences aus localStorage laden, wenn Banner geöffnet wird
                const consent = localStorage.getItem('cookieConsent');
                if (consent) {
                    try {
                        setPreferences(JSON.parse(consent));
                    } catch (e) {
                        setPreferences({ necessary: true, analytics: false, marketing: false });
                    }
                } else {
                    setPreferences({ necessary: true, analytics: false, marketing: false });
                }
            }
        } else {
            const consent = localStorage.getItem('cookieConsent');
            if (!consent) {
                setShowBanner(true);
            }
        }
    }, [open]);

    const handleAccept = () => {
        localStorage.setItem('cookieConsent', JSON.stringify(preferences));
        setShowBanner(false);
        if (onClose) onClose();
        onAccept(preferences);
    };

    const handleDecline = () => {
        const declinedPreferences = {
            necessary: true,
            analytics: false,
            marketing: false,
        };
        localStorage.setItem('cookieConsent', JSON.stringify(declinedPreferences));
        setShowBanner(false);
        if (onClose) onClose();
        onAccept(declinedPreferences);
    };

    const handleClose = () => {
        setShowBanner(false);
        if (onClose) onClose();
    };

    const handleSwitchChange = (checked: boolean, name: string) => {
        setPreferences({
            ...preferences,
            [name]: checked,
        });
    };

    if (!showBanner) {
        return null;
    }

    return (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-md rounded-xl shadow-2xl bg-white border border-gray-200 p-6 flex flex-col gap-4 animate-fade-in">
            <div className="text-base font-semibold text-gray-900 flex items-center gap-2">
                Wir verwenden Cookies, um Ihre Erfahrung zu verbessern. Passen Sie Ihre Einstellungen an:
            </div>
            <div className="space-y-3">
                <Collapsible>
                    <div className="flex gap-3 items-center">
                        <Switch disabled checked id="necessary-switch"/>
                        <Label htmlFor="necessary-switch">Notwendig (immer aktiv)</Label>
                        <CollapsibleTrigger><InfoIcon className="w-4 h-4 text-gray-400 hover:text-green-600"/></CollapsibleTrigger>
                    </div>
                    <CollapsibleContent>
                        <span className="text-xs text-gray-500">Technisch notwendige Cookies für die Grundfunktionalität.</span>
                    </CollapsibleContent>
                </Collapsible>
                <Collapsible>
                    <div className="flex gap-3 items-center">
                        <Switch
                            disabled={true}
                            checked={preferences.analytics}
                            name="analytics"
                            onCheckedChange={(checked) => handleSwitchChange(checked, 'analytics')}
                            id="analytics-switch"
                        />
                        <Label htmlFor="analytics-switch">Analytik</Label>
                        <CollapsibleTrigger><InfoIcon className="w-4 h-4 text-gray-400 hover:text-green-600"/></CollapsibleTrigger>
                    </div>
                    <CollapsibleContent>
                        <span className="text-xs text-gray-500">Statistische Auswertung zur Verbesserung der Website. (Derzeit nicht in Verwendung)</span>
                    </CollapsibleContent>
                </Collapsible>
                <Collapsible>
                    <div className="flex gap-3 items-center">
                        <Switch
                            checked={preferences.marketing}
                            name="marketing"
                            onCheckedChange={(checked) => handleSwitchChange(checked, 'marketing')}
                            id="marketing-switch"
                        />
                        <Label htmlFor="marketing-switch">Marketing</Label>
                        <CollapsibleTrigger><InfoIcon className="w-4 h-4 text-gray-400 hover:text-green-600"/></CollapsibleTrigger>
                    </div>
                    <CollapsibleContent>
                        <span className="text-xs text-gray-500">Marketing-Cookies für personalisierte Werbung. (Derzeit nicht in Verwendung)</span>
                    </CollapsibleContent>
                </Collapsible>
            </div>
            <div className="flex gap-2 justify-end">
                <Button variant="primary" onClick={handleAccept}>Akzeptieren</Button>
                <Button variant="ghost" onClick={handleDecline}>Ablehnen</Button>
                <Button variant="ghost" onClick={handleClose}>Schließen</Button>
            </div>
            <div className="mt-2 flex justify-between items-center text-xs">
                <div></div>
                <a
                    href="/datenschutz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline text-gray-500 hover:text-green-700"
                >Datenschutzerklärung</a>
            </div>
        </div>
    );
};

export default CookieBanner;