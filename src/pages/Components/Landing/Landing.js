import React, { useEffect, useState } from 'react'
import Tilt from 'react-parallax-tilt';

const Landing = ({ user, updateEntries }) => {
    const { name, id, entries } = user || {};
    const [imageURL, setImageURL] = useState('')
    const [input, setInput] = useState('')
    const [boxes, setBoxes] = useState([])
    const onInputChange = (event) => {
        setInput(event.target.value);
    }

    const calculateFaceLocation = (data) => {
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        const boxes = data.outputs[0].data.regions.map((x) => {
            const boundingBox = x.region_info.bounding_box
            return {
                leftCol: boundingBox.left_col * width,
                topRow: boundingBox.top_row * height,
                rightCol: width - (boundingBox.right_col * width),
                bottomRow: height - (boundingBox.bottom_row * height)
            }
        })
        return boxes
    }
    const displayFaceBox = (boxes) => {
        setBoxes(boxes);
    }



    const onButtonClick = () => {
        setImageURL(input)
        fetch('https://face-recognition-api-nine.vercel.app/imageurl', {
            method: 'post',
            headers: { 'Content-Type': "application/json" },
            body: JSON.stringify({
                input: input
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response) {
                    fetch('https://face-recognition-api-nine.vercel.app/image',
                        {
                            method: 'post',
                            headers: { 'Content-Type': "application/json" },
                            body: JSON.stringify({
                                id: id
                            })
                        })
                        .then(res => res.json())
                        .then(count => {
                            if (updateEntries) {
                                updateEntries(count[0].entries);
                            }

                        })
                        .catch(err => console.log)
                }
                displayFaceBox(calculateFaceLocation(response))
            })
            .catch(err => console.log(err));
    }

    return (
        <div>
            <Logo />
            <Rank userName={name} entries={entries} />
            <ImageLinkForm onInputChange={onInputChange} onButtonClick={onButtonClick} imageURL={imageURL} boxes={boxes} />
        </div>
    )
}


const Logo = () => {
    return (
        <Tilt className="drop-shadow-md w-20 h-30 bg-gradient-to-r from-slate-300 to-blue-300 ml-10 my-2 border-2 border-gray-300" tiltMaxAngleX="20" tiltReverse="true">
            <div className='flex m-auto h-full p-2'>
                <img className='' src="https://img.icons8.com/ios-glyphs/90/null/brain.png" />
            </div>
        </Tilt>
    )
}
const Rank = ({ userName, entries }) => {
    return (
        <>
            <div className="text-center">
                {`Hi ${userName}, Your current Entry Count is `}
            </div>
            <div className="text-center text-2xl mb-4">
                {`${entries}`}
            </div>
        </>
    )
}
const ImageLinkForm = ({ onInputChange, onButtonClick, imageURL, boxes }) => {
    const [copied, setCopied] = useState(false);
    const linkToCopy = "https://upload.wikimedia.org/wikipedia/commons/5/51/Brad_Pitt_Fury_2014.jpg";
    const [loading, setLoading] = useState(false)
    const handleButtonClick = () => {
        onButtonClick();
        setLoading(true);
    };
    const copyToClipboard = () => {
        navigator.clipboard.writeText(linkToCopy)
            .then(() => {
                setCopied(true);
                setTimeout(() => {
                    setCopied(false);
                }, 2000);
            })
            .catch(err => console.error('Failed to copy: ', err));
    };

    useEffect(() => {
        if (boxes.length > 0) {
            setLoading(false);
        }
    }, [boxes]);

    const boundingBoxes = boxes.map((element, index) => (
        <li key={index} className="bounding-box" style={{ top: element.topRow, right: element.rightCol, bottom: element.bottomRow, left: element.leftCol }}></li>
    ));

    return (
        <>
            <p className="text-base text-center">
                This Magic Brain will detect faces in your pictures. Try using Image URL,
                <br />
                Here example of image link, you can copy and then submit!
            </p>
            <div className="flex flex-col items-center justify-center py-4 gap-4">
                <button
                    onClick={copyToClipboard}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-1 rounded-full"
                > {copied ? "Copied !" : "Copy !"} </button>
                {loading && "Please wait a little while, the API  and Image is Loading"}
            </div>
            <div className="flex items-center text-base mt-2 p-4 border-2 mx-auto shadow-lg shadow-indigo-500/50 w- max-w-md w-[100%]">
                <input className="md:basis-3/4 basis-2/3 py-1" type="text" onChange={onInputChange} />
                <button className="md:basis-1/4 basis-1/2 btn--primary py-1" onClick={handleButtonClick}>
                    {loading ? "Loading" : "Detect"}
                </button>
            </div>
            <div className="flex justify-center mt-4">
                <div className='absolute'>
                    <img id="inputimage" src={imageURL} className="max-h-80" />

                    <ul className='z-10'> {boundingBoxes} </ul>
                </div>
            </div>
        </>
    )
}

export default Landing