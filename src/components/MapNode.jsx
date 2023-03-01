export default function MapNode(props) {
  return <textarea id={props.mapNodeObj.id} value={props.mapNodeObj.text} onChange={props.onChange} />;
}
