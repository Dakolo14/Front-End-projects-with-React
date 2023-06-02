import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import headerImg from "../assets/img/header-img.svg";
import 'animate.css';
import TrackVisibility from 'react-on-screen';

export const Banner = () => {
    // Loop Number to start from the first array 
    const [loopNum, setLoopNum] = useState(0);
    // The word being deleted/typed out (is false because we start by typing the word)
    const [isDeleting, setIsDeleting] = useState(false);
    // The List of Words to be showed in the loop
    const toRotate = [ "Web Developer", "Web Designer", "UI/UX Designer" ];
    // Showing the text being display one after the other
    const [text, setText] = useState('');
    // Determines how fast each letter is being typed
    const [delta, setDelta] = useState(300 - 100);
    // How much time transition between each words
    const period = 2000;

    // Writing the function responsible for typing and deleting
    useEffect(() => {
        let ticker = setInterval(() => {
            tick();
        }, delta);

        return () => { clearInterval(ticker) };
    }, [text])

    const tick = () => {
        // picking the amount of looped text to show
        let i = loopNum % toRotate.length;
        let fullText = toRotate[i];
        let updatedText = isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta(prevDelta => prevDelta /3)
        }
        // If the Text is done typing
        if (!isDeleting && updatedText === fullText) {
            setIsDeleting(true);
            setDelta(period);
        } else if (isDeleting && updatedText === ''){
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(300);
        } 
    }


   return (
    <section className="banner" id="home">
        <Container>
            <Row className="align-items-center">
                <Col xs={12} md={6} xl={7}>
                    <TrackVisibility>
                    {({ isVisible }) =>
                    <div className={isVisible ? "animate__animated animate__fadeInLeft" : ""}>
                        <span className="tagline">Welcome to my Portfolio</span>
                        <h1>
                            {`Hi I'm Ajose Damilare `}<span className="wrap">{text}</span>
                        </h1>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book</p>
                        <button onClick={() => console.log('connect')}>Let's Connect <ArrowRightCircle size={25}/></button>
                    </div>}
                    </TrackVisibility>
                </Col>
                <Col xs={12} md={6} xl={5}>
                    <img src={headerImg} alt="Header Img" />
                </Col>
            </Row>
        </Container>
    </section>
   )
}