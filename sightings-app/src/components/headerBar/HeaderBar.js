import "./HeadBar.css";

function HeadBar(props) {
  const handleLogout = () => {
    props.logOut(); // Assuming logOut is a prop passed to handle the logout process
  };
  return (
    <div className="head-bar">
      <button className="logOutButton" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  );
}

export default HeadBar;
