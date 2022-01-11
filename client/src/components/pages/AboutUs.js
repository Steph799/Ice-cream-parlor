import React from 'react'
import { jaujaUrl } from '../../shared/url'
function AboutUs() {
    return (
        <div className="iceCreams" >
            <h1 style={{ color: "red" }}>About Jaujita</h1>
            <p className="paragraph">Jaujita is diminutive for the name <a href={jaujaUrl} target="_blank" rel="noreferrer noopener">
                "Jauja"</a> (a very popular ice cream parlor in Argentina).<br /> We are a small boutique who specializes in ice creams,
                yogurts, waffles and other sweets that will blow your mind.<br />We were affected by the best ice cream parlors in
                Italy and Argentina in our journey in order to create the special taste<br/> that drives crazy all the senses.</p>

            <p className="paragraph">Israel is influenced by the culinary of many countries. It's not a secret that the
                israeli flavor has high standards<br/> and it's almost impossible not to compare the current experience to what we tasted
                in other place abroad...<br />That's what Jaujita want to change! our goal will be that if you ever eat other ice cream<br/>
                your reference will be us. We bring the legendary exotic italian ice-cream to here!
            </p>
            <p className="paragraph">Our products are made with a great passion. Every 2 month approx, we offer a new workshop in which
                people<br />can participate and learn from us. We promise to share some secrets (but not all of them!).<br />For more
                information, you can contact with us below.
            </p>
            <p className="paragraph">Come to Jaujita and enjoy a unique experience. A pure enjoyment is promised</p>
            <h2>About the owner</h2>
            <p className="paragraph">Stephen Cohen was a young and ambitious backpacker when he traveled for the first time to latin
                America<br />His journey took him to the Patagonia in south of Argentina. He used to work in an Italian restaurant in
                order to finance his travels.<br/>By the time he worked there, he was impressed by the italian culinary and the decided to
                master it. After crossing the whole continent,<br/> form the Andes to the caribbeans in Mexico he was molded by the
                fascinating cultures and<br/> decided to establish Jaujita (on behalf of his girl friend's nickname). "Jaujita isn't just
                 an Ice-cream for me,<br/> but a way of living like "hakuna matata" if you want. This word contain a story,<br/>
                 and I believe that behind every successful business, there is a good story. You just need to tell it right!"
            </p>
        </div>
    )
}

export default AboutUs
