function Content({ image_array, imagepointer, handleNext, handleBack }) {
    return (
        <div>
            {image_array ? (
                <img src={image_array[imagepointer].url} alt={image_array[imagepointer].name} />
            ) : "No images are available right now :(, but you can search for images and populate the database with image :)"
            }
            <div>
                {image_array ? (image_array[imagepointer + 1] ? (
                    <button
                        onClick={() => handleNext(imagepointer)}
                    >
                        next
                    </button>
                ) : null) : null}
                {image_array ? (image_array[imagepointer - 1] ? (
                    <button
                        onClick={() => handleBack(imagepointer)}
                    >
                        back
                    </button>
                ) : null) : null}
            </div>
        </div>
    );
}
export default Content