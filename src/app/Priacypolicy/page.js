"use client";

export default function PolicyPage() {
    const handleClose = () => {
        window.close();
    };

    return (
        <div className="page-container">
            <button
                type="button"
                onClick={handleClose}
                className="back-button"
            >
                Back
            </button>

            <h1>Privacy &amp; Policy</h1>

            <p>
                Your privacy matters to us. We are committed to keeping your
                information safe and being transparent about how your data is
                handled.
            </p>

            <ul>
                <li>
                    <strong>Your location:</strong> We do not steal, sell, or
                    secretly collect your location.
                </li>
                <li>
                    <strong>Your data:</strong> We only use information that is
                    necessary to provide the features of this website.
                </li>
                <li>
                    <strong>No selling:</strong> We do not sell your personal
                    information to third parties.
                </li>
                <li>
                    <strong>Your control:</strong> You can stop using the
                    website at any time.
                </li>
            </ul>

            <p>
                We take reasonable measures to protect the information handled
                by our service and aim to keep your data secure.
            </p>
        </div>
    );
}