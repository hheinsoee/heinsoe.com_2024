
function AdminLayout ({ header, headerComponents, leftSide, rightSide })  {
    return (
        <div className="h-screen flex flex-col ml-1">
            <div className=" grid grid-cols-5 flex-1 overflow-auto gap-1">
                <div className="overflow-auto col-span-3">
                    {leftSide}
                </div>
                <div className="overflow-auto col-span-2 ">
                    {rightSide}
                </div>
            </div>
        </div>
    )
}
export default AdminLayout