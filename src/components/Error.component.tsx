export default function Error(props: {
    text: string;
}) {
    return <div className="relative w-full h-0">
        <span className={`absolute text-error left-0 right-0 text-center ${props.text ? '' : 'hidden'}`}>{props.text}</span>
    </div>
}
