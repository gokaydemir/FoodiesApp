"use client";
import { useRef, useState } from 'react';
import classes from './image-picker.module.css';
import Image from 'next/image';
export default function ImagePicker({ label, name }) {

    const imageInput = useRef();
    const [imagePicker, setImagePicker] = useState("");
    function handlePickClick() {
        imageInput.current.click();
    }

    function changePick(e) {
        const file = e.target.files[0];

        if (!file) {
            setImagePicker(null);
            return;
        }
        const fileReader = new FileReader();

        fileReader.onload = () => {
            setImagePicker(fileReader.result);
        }

        fileReader.readAsDataURL(file);
    }
    return (
        <div className={classes.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={classes.controls}>
            <div className={classes.preview}>
                {!imagePicker && <p>No image picked yet.</p>}
                {imagePicker && <Image fill src={imagePicker} alt='The image selected by the user.' />}
            </div>
                <input
                    className={classes.input}
                    type="file"
                    accept="image/jpeg, image/png"
                    name={name}
                    id={name}
                    ref={imageInput}
                    onChange={changePick}
                />
            </div>
            <button onClick={handlePickClick} className={classes.button} type="button">Pick an image</button>
        </div>
    )
}