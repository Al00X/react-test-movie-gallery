import "./Loader.component.css";

export default function Loader(props: {
    size?: string;
}) {
    return <div className="relative inline-block" style={{width: props.size ?? '1rem', height: props.size ?? '1rem'}}>
        <div className="ui-loader"></div>
    </div>
}
