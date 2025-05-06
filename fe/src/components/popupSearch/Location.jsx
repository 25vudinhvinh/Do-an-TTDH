function Location({ item }) {
    return (
        <div className="border-gray-100 border-t-2 my-0.5  hover:bg-gray-100">
            <div className="flex min-h-1.5 justify-between items-center cursor-pointer">
                <div>
                    <p className="font-semibold text-lg">{item.name}</p>
                    <p className="text-sm font-semibold opacity-60">
                        {item.address}
                    </p>
                    <p className="text-green-700 text-sm font-semibold opacity-60">
                        Thời gian: {item.open_hours}
                    </p>
                </div>
                <div className=" ">
                    <img
                        className="object-cover w-[100px] h-[100px] rounded-2xl"
                        src={item.primary_image}
                        alt=""
                    />
                </div>
            </div>

            <div>
                <p className="opacity-60 text-sm font-semibold">
                    {item.additional_services.split(', ').join(' - ')}
                </p>
            </div>
        </div>
    )
}

export default Location
