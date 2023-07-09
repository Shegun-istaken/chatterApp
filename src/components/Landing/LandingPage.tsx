import "./landingPageStyles.css";
import aboutChatter from "../../assets/aboutChatter.jpg";
import WhyChatterTabs from "./WhyChatterTabs";
import { whyTabs } from "../../assets/data/whyTabs";
import muhydeenImage from "../../assets/ChatterMuhydeen.jpg";
import user1 from "../../assets/user1.jpg";
import user2 from "../../assets/user2.jpg";
import user3 from "../../assets/user3.jpg";
import GetStartedButton from "./GetStartedButton";

function LandingPage() {
  return (
    <div className="landingPage">
      <header>
        <h1>Welcome to Chatter: A Haven for Text-Based Content</h1>
        <p>
          {" "}
          Unleash the Power of Words, Connect with like-minded Readers and
          Writers
        </p>

        <GetStartedButton />
      </header>

      <section className="aboutChatter">
        <div>
          <h2>About Chatter</h2>
          <p>
            Chatter is a multi-functional platform where authors and readers can
            have access to their own content. It aims to be a traditional
            bookworm’s heaven and a blog to get access to more text based
            content. Our vision is to foster an inclusive and vibrant community
            where diversity is celebrated. We encourage open-mindedness and
            respect for all individuals, regardless of their backgrounds or
            beliefs. By promoting dialogue and understanding, we strive{" "}
          </p>
        </div>
        <img src={aboutChatter} alt="hall with people having conversations" />
      </section>

      <section className="whyChatter">
        <h2>Why you should join Chatter</h2>
        <p>
          Our goal is to make writers and readers see our platform as their next
          heaven for blogging, ensuring ease in interactions, connecting with
          like-minded peers, have access to favorite content based on interests
          and able to communicate your great ideas with people
        </p>

        <div className="whyTabs">
          {whyTabs.map((data, index) => (
            <WhyChatterTabs
              key={index}
              heading={data.heading}
              body={data.body}
              src={data.src}
            />
          ))}
        </div>
      </section>

      <section className="chatterUserReview">
        <img src={muhydeenImage} alt="chatter user" />
        <div>
          <p>
            "Chatter has become an integral part of my online experience. As a
            user of this incredible blogging platform, I have discovered a
            vibrant community of individuals who are passionate about sharing
            their ideas and engaging in thoughtful discussions.”
          </p>
          <p className="name">
            Adebobola Muhydeen, <span>Software developer at Apple</span>
          </p>
          <GetStartedButton join={true} />
        </div>
      </section>

      <section className="lastAds">
        <div className="userImages">
          <img src={user1} alt="a chatter user" />
          <img src={user2} alt="a chatter user" />
          <img src={user3} alt="a chatter user" />
        </div>

        <div className="userAdContent">
          <h2>Write, read and connect with great minds on chatter</h2>
          <p>
            Share people your great ideas, and also read write-ups based on your
            interests. connect with people of same interests and goals{" "}
          </p>
          <GetStartedButton />
        </div>
      </section>

      <footer>
        <h2>Chatter</h2>

        <div>
          <h3>Explore</h3>
          <p>Community</p>
          <p>Trending Blogs</p>
          <p>Chatter for Teams</p>
        </div>

        <div>
          <h3>Support</h3>
          <p>Support Docs</p>
          <p>Join Slack</p>
          <p>Contact</p>
        </div>

        <div>
          <h3>Official Blog</h3>
          <p>Official Blog</p>
          <p>Engineering Blog</p>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
