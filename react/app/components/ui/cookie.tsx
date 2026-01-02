import React, {useEffect, useState} from 'react';
import {CollapsibleBase, CollapsibleBaseContent, CollapsibleBaseTrigger} from "~/components/ui/collapsible-base";
import {SwitchBase} from "~/components/ui/switch-base";
import {FieldBase, LabelBase} from "~/components/ui/field-base";
import {InfoIcon} from "lucide-react";
import { ButtonBase } from './button-base';
import styles from './cookie.module.css';

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
        // Wenn open true/false gesetzt wird, Banner entsprechend anzeigen
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
            // Prüfe immer beim Mounten, ob Consent fehlt, und zeige Banner
            const consent = localStorage.getItem('cookieConsent');
            if (!consent) {
                setShowBanner(true);
            } else {
                setShowBanner(false);
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
        <div className={styles.Container}>
            <div className={styles.Title}>
                Wir verwenden Cookies, um Ihre Erfahrung zu verbessern. Passen Sie Ihre Einstellungen an:
            </div>
            <div className={styles.List}>
                <CollapsibleBase>
                    <FieldBase className={styles.Field}>
                        <SwitchBase disabled checked id="necessary-switch"/>
                        <LabelBase>Notwendig (immer aktiv)</LabelBase>
                        <CollapsibleBaseTrigger><InfoIcon className={styles.InfoIcon}/></CollapsibleBaseTrigger>
                    </FieldBase>
                    <CollapsibleBaseContent>
                        <span className={styles.Description}>Technisch notwendige Cookies für die Grundfunktionalität.</span>
                    </CollapsibleBaseContent>
                </CollapsibleBase>
                <CollapsibleBase>
                    <FieldBase className={styles.Field}>
                        <SwitchBase
                            disabled={true}
                            checked={preferences.analytics}
                            name="analytics"
                            onCheckedChange={(checked) => handleSwitchChange(checked, 'analytics')}
                            id="analytics-switch"
                        />
                        <LabelBase>Analytik</LabelBase>
                        <CollapsibleBaseTrigger><InfoIcon className={styles.InfoIcon}/></CollapsibleBaseTrigger>
                    </FieldBase>
                    <CollapsibleBaseContent>
                        <span className={styles.Description}>Statistische Auswertung zur Verbesserung der Website. (Derzeit nicht in Verwendung)</span>
                    </CollapsibleBaseContent>
                </CollapsibleBase>
                <CollapsibleBase>
                    <FieldBase className={styles.Field}>
                        <SwitchBase
                            disabled={true}
                            checked={preferences.marketing}
                            name="marketing"
                            onCheckedChange={(checked) => handleSwitchChange(checked, 'marketing')}
                            id="marketing-switch"
                        />
                        <LabelBase>Marketing</LabelBase>
                        <CollapsibleBaseTrigger><InfoIcon className={styles.InfoIcon}/></CollapsibleBaseTrigger>
                    </FieldBase>
                    <CollapsibleBaseContent>
                        <span className={styles.Description}>Marketing-Cookies für personalisierte Werbung. (Derzeit nicht in Verwendung)</span>
                    </CollapsibleBaseContent>
                </CollapsibleBase>
            </div>
            <div className={styles.Actions}>
                <ButtonBase onClick={handleAccept}>Akzeptieren</ButtonBase>
                <ButtonBase onClick={handleDecline}>Ablehnen</ButtonBase>
                <ButtonBase onClick={handleClose}>Schließen</ButtonBase>
            </div>
            <div className={styles.Footer}>
                <div></div>
                <a
                    href="/datenschutz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.Link}
                >Datenschutzerklärung</a>
            </div>
        </div>
    );
};

export default CookieBanner;