function Button({ text, onClick }) {
    return (
        <div
            onClick={onClick}
            className="min-h-1 bg-white rounded-2xl p-2 font-medium text-sm flex items-center justify-center shadow-sm"
        >
            <button className="inline-flex whitespace-nowrap select-none">
                {text}
            </button>
        </div>
    )
}

export default Button
