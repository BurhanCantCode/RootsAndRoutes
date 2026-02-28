import Link from "next/link"

export default function PrivacyPolicyPage() {
    return (
        <div className="bg-background min-h-screen py-20 px-4">
            <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-2xl shadow-sm border border-border/50">
                <h1 className="font-serif text-4xl font-bold mb-8 text-foreground">
                    Roots and Routes – Terms of Data Protection, Image, and Story Consent
                </h1>

                <div className="prose prose-slate max-w-none text-muted-foreground">
                    <p><strong>Project Leaders:</strong> Melissa Okeke and Gamze Nur Demir</p>

                    <h2 className="text-2xl font-serif text-foreground mt-8 mb-4">Purpose of This Document</h2>
                    <p>
                        We are committed to protecting your personal information and respecting your rights. This document explains how we collect, use, and safeguard your data, as well as how we may use images, videos, or written stories in connection with this project.
                    </p>

                    <p>This project complies with applicable data protection laws, including:</p>
                    <ul>
                        <li>Ecuador’s Ley Orgánica de Protección de Datos Personales (LOPDP)</li>
                        <li>Turkey’s Law on the Protection of Personal Data (KVKK)</li>
                        <li>International principles inspired by the General Data Protection Regulation (GDPR)</li>
                    </ul>

                    <h2 className="text-2xl font-serif text-foreground mt-8 mb-4">Why We Collect Your Data</h2>
                    <p>We use this information only for purposes related to the project, such as:</p>
                    <ul>
                        <li>Communicating with participants</li>
                        <li>Recording participation</li>
                        <li>Sharing project results (reports, presentations, or awareness campaigns)</li>
                        <li>Publishing approved stories, images, or videos on project materials (e.g., website, social media, or events)</li>
                    </ul>
                    <p className="font-medium text-foreground">We will never sell your data or use it for unrelated purposes.</p>

                    <h2 className="text-2xl font-serif text-foreground mt-8 mb-4">What Information We Collect</h2>
                    <p>We may collect:</p>
                    <ul>
                        <li>Personal details (e.g., name, age, email, phone number) if voluntarily provided</li>
                        <li>Project-related information (e.g., participation responses, surveys, feedback, stories submitted)</li>
                        <li>Images or recordings (photos, videos, or audio, if you give consent)</li>
                    </ul>
                    <p>
                        Participants have the option to submit stories anonymously. If a story is submitted anonymously, your name or any identifying information will not be featured.
                    </p>

                    <h2 className="text-2xl font-serif text-foreground mt-8 mb-4">How Your Data Will Be Stored</h2>
                    <ul>
                        <li>Your information will be stored securely in password-protected files.</li>
                        <li>Only the project team will have access.</li>
                        <li>Data will be kept only as long as necessary for the project and then deleted or anonymized.</li>
                    </ul>

                    <h2 className="text-2xl font-serif text-foreground mt-8 mb-4">Your Rights</h2>
                    <p>You have the right to:</p>
                    <ul>
                        <li>Access your personal data and know how it is used</li>
                        <li>Request corrections if your data is inaccurate</li>
                    </ul>
                    <p>
                        To exercise these rights, you can contact us at:{' '}
                        <a href="mailto:rootsandroutes34@gmail.com" className="text-primary hover:underline">rootsandroutes34@gmail.com</a>
                    </p>

                    <h2 className="text-2xl font-serif text-foreground mt-8 mb-4">Image, Media, and Story Consent</h2>
                    <p>By participating in this project, you allow us to:</p>
                    <ul>
                        <li>Take photos or videos of your participation</li>
                        <li>Use them, as well as stories you submit, in project reports, presentations, or social media posts</li>
                    </ul>
                    <p>
                        Participation in photos, videos, or submitting stories is voluntary. If you submit anonymously, your name or identifying information will not appear in media.
                    </p>

                    <h2 className="text-2xl font-serif text-foreground mt-8 mb-4">Underage Participants</h2>
                    <p>
                        If you are under the age of 18, parental or legal guardian consent is required before participating in this project. This consent must cover both the collection of personal data and the use of images, videos, or stories.
                    </p>
                    <p>
                        Without verified parental or guardian consent, minors cannot participate in any activity involving the sharing of personal data, images, or stories.
                    </p>

                    <h2 className="text-2xl font-serif text-foreground mt-8 mb-4">Agreement</h2>
                    <p>
                        By submitting your story or information through our forms, you confirm that you have read and understood this document and agree to the collection and use of your data, images, and/or stories as described above. Submission of the form serves as your consent.
                    </p>
                </div>
            </div>
        </div>
    )
}
