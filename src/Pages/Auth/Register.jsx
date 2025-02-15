import React from 'react';
import registerpic1 from '../../assets/AuthAssets/registerpic1.png';
import registerpic2 from '../../assets/AuthAssets/registerpic2.png';
import registerpic3 from '../../assets/AuthAssets/registerpic3.png';
import RegisterCard from './Auth-Components/RegisterCard';

function Register() {
    const cardData = [
        {
            src: registerpic1,
            Title: "Companies",
            discription: "Find the best of the best to achieve your marketing goals in one place with one click",
            to: "/companyrtegister"
        },
        {
            src: registerpic2,
            Title: "Content-Creator",
            discription: "If you think that you have the passion in content creation join our team now and share your art",
            to: "/contentcreatorregister",
        },
        {
            src: registerpic3,
            Title: "Ushers",
            discription: "If you have the knowledge and experience in ushering field join our team and make events much easier",
            to: "/usherregister"
        }
    ];

    return (
        <div>
            <div className="flex flex-col justify-center items-center mt-20 lg:px-24 px-8 gap-10">
                <h2 className='text-white text-3xl font-bold mb-6'>VISITING US AS</h2>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-16">
                    {cardData.map((card, index) => (
                        <RegisterCard
                            key={index}
                            src={card.src}
                            Title={card.Title}
                            discription={card.discription}
                            to={card.to}
                            buttonText={"Register"}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Register;
