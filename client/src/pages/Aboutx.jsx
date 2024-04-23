import React from 'react';
import './css/Aboutx.css'

const About = () => {
    return (
        <div className='about_doc'>
            <header>
                <h1>About Us</h1>
            </header>
            <main>
                <section>
                    <h2>Our Mission</h2>
                    <p>Introducing an innovative solution tailored to simplify the complexities of Sri Lanka's legal landscape. Born from the recognition of the daunting task regular citizens face in understanding and accessing the multifaceted legal systems inherited from various historical influences, including English common law, Roman-Dutch civil law, and customary laws like "Thesawalamai," our project aims to bridge the gap between the law and the layperson. With an intuitive online platform, LegalEase Sri Lanka offers accessible educational resources, a comprehensive database of laws. Through community forums and collaboration with legal experts, we aspire to empower individuals to navigate their legal rights and responsibilities confidently. Join us in our mission to democratize access to justice and foster legal empowerment for all Sri Lankans.</p>
                </section>
                <section>
                    <h2>More Information</h2>
                    <ul>
                        <li><b>Student Name:</b> Nambige Alaric Shiran Premarathna Singhno</li><br />
                        <li><b>Supervisor:</b> Ms.Hirushi Dilpriya</li><br />
                        <li><b>Plymouth Index Number:</b> 10820765</li><br />
                    </ul>
                </section>
            </main>
            <footer>
                <p>&copy; 2024 Alaric Fashion. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default About;