import { useTracker } from "meteor/react-meteor-data";
import React, { useState } from "react";
import { ImagesCollection } from "../api/ImagesCollection";
import { Div, Input, Button, Ul, A, Img } from '@material-ui/core';

export function ImageDisplay({ clientid }) {
    const images = useTracker(() => ImagesCollection.find(clientid && { meta: { clientid } }).fetch());
    const [image, setImage] = useState(undefined);
    const onFileChange = (e) => {
        setImage(e.target.files[0]);
    };
    const onUpload = () => {
        ImagesCollection.insert({ file: image, meta: { clientid } });
        setImage(undefined);
    };
    const remove = (item) => {
        ImagesCollection.remove({ _id: item._id });
    };

    return (
        <Div style={{ display: "flex", flexDirection: 'row' }}>
            <Input type="file" onChange={onFileChange} />
            {image && (
                <Img
                    alt="File Missing"
                    src={image && URL.createObjectURL(image)}
                    style={{ height: 200, aspectRatio: 1 }}
                />
            )}
            {image && (
                <Button type="button" onClick={onUpload}>
                    Upload Image
                </Button>
            )}
            <Ul>
                {images.map((item) => {
                    const link = ImagesCollection.findOne({ _id: item._id }).link('original', window.location.href);
                    return (
                        <Div key={item._id}>
                            <A href={link} target="_blank" rel="noreferrer">
                                <Img alt={link} src={link} style={{ width: 100, aspectRatio: 1 }} />
                            </A>

                            <Button type="button" onClick={() => remove(item)}>
                                Delete
                            </Button>
                        </Div>
                    );
                })}
            </Ul>

        </Div>
    );
}
