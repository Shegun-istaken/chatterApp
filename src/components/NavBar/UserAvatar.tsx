function UserAvatar({url, size, className}: {url: string, size?: string, className?: string}) {
  return (
    <>
      {url ? (
        <img
          className={className}
          src={url}
          alt="user's avatar"
        />
      ) : (
        <i className={`material-icons ${size}`}>person</i>
      )}
    </>
  );
}

export default UserAvatar;
