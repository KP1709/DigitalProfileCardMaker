import { useRef, useState } from "react";
import { toBlob } from "html-to-image";

const useCardImage = () => {
    const cardRef = useRef(null);
    const [status, setStatus] = useState("");
    const [isBusy, setIsBusy] = useState(false);

    const createCardImage = async () => {
        if (!cardRef.current) {
            throw new Error("The profile card is unavailable.");
        }

        const image = await toBlob(cardRef.current, {
            pixelRatio: 2
        });

        if (!image) {
            throw new Error("The profile card image could not be created.");
        }

        return image;
    };

    const downloadImage = async () => {
        if (isBusy) return;

        setIsBusy(true);
        setStatus("");

        try {
            const image = await createCardImage();
            const imageUrl = URL.createObjectURL(image);
            const link = document.createElement("a");
            link.href = imageUrl;
            link.download = "profile-card.png";
            link.click();
            window.setTimeout(() => URL.revokeObjectURL(imageUrl), 0);
            setStatus("Photo downloaded.");
        } catch {
            setStatus("The photo could not be created.");
        } finally {
            setIsBusy(false);
        }
    };

    const copyImage = async () => {
        if (isBusy) return;

        if (!navigator.clipboard?.write || typeof ClipboardItem === "undefined") {
            setStatus("Copying photos is not supported in this browser.");
            return;
        }

        setIsBusy(true);
        setStatus("");

        try {
            const image = await createCardImage();
            await navigator.clipboard.write([
                new ClipboardItem({ "image/png": image })
            ]);
            setStatus("Photo copied to clipboard.");
        } catch {
            setStatus("The photo could not be copied.");
        } finally {
            setIsBusy(false);
        }
    };

    return { cardRef, copyImage, downloadImage, isBusy, status };
};

export default useCardImage;