function GreetingCard(props){
  return(
    <>
     <h2>Hello  , {props.name}!</h2>
     <p>{props.message}</p>
    </>
  );
}
export default GreetingCard;