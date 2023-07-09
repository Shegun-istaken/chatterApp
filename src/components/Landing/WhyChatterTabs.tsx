type whyProps = {
  heading: string;
  body: string;
  src: string;
};

function WhyChatterTabs({ heading, body, src }: whyProps) {
  return (
    <div>
      <img src={src} />
      <h3>{heading}</h3>
      <p>{body}</p>
    </div>
  );
}

export default WhyChatterTabs;
