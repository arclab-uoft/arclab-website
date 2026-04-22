
export default ({ title, story, image, collaborators }) => {
    return (
        <div className=" w-full h-full max-w-screen-xl mx-auto text-gray-600 gap-x-12 items-center justify-between overflow-hidden md:flex md:px-8">
            <div className="flex-none space-y-5 px-4 sm:max-w-lg md:px-0 lg:max-w-xl">
                <h2 className="text-xl text-gray-800 font-extrabold md:text-2xl">
                    {title}
                </h2>
                <p>
                    {story}
                </p>
            </div>
            <div className="flex-none mt-14 md:mt-0 md:max-w-xl">
                <img
                    src={image}
                    className="md:rounded-[42px]"
                    alt=""
                />
            </div>
        </div>
    );
};