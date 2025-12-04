function ProfileCard(props){
  const card={
    width:'300px',
    margin:'auto',
    backgroundColor:'#e0f7fa',
    border:'1px solid gray',
    padding:'8px',
    borderRadius:'16px',
    textAlign:'center',
    marginBottom:'15px'
  }
  return(
    <div style={card}>
      <h2>{props.name}</h2>
      <p>{props.profile}</p>
    </div>
  );
}
export default ProfileCard;