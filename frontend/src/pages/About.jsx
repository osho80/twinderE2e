import React, { Component } from 'react';

export class About extends Component {
  state = {
   
    about: 'vision',
    developer: null,
    isDetails: false
  };

  

  onToggleAbout = () => {
    let { about } = this.state;
    if (about === 'vision') this.setState({ about: 'team' })
    else this.setState({ about: 'vision' })
  }

  onToggleDeveloper = (developer) => {
    this.setState({ developer })
    this.setState({ isDetails: true })

  }

  onToggleDetails = () => {
    this.setState({ isDetails: false })
  }

  render() {
    let { about, developer, isDetails } = this.state;
    return (
      <section className="about-main">
        {(about === 'vision') ? <h2 className="about-toggle" onClick={this.onToggleAbout}>Our Vision</h2> :
          <h2 className="about-toggle" onClick={this.onToggleAbout}>Our Team</h2>}
        {(about === 'vision') && <section className="about-twinder">
          <p>
            We at Twinder think that dating apps tend to be either superficial or extremely tiresome with page after page of question that don’t really help you find your match.
          </p>
          <p>
            The social era has brought us so much and its all being tossed away in the dating apps scene.
          </p>
          <p>
            If you share the feeling that you would rather have the possibility for a deeper glance into your possible match’s inner world, come join our community of beautiful and exciting people looking to celebrate life to the fullest.
          </p>
          <p>
            Here at Twinder, we believe everyone should be able to introduce themselves as they wish, and not be constrained to a set of question and predefined answers. In Twinder it is easy to post your thoughts, ideas, activities or anything else you think may help others to get to know you better and improve your chances of finding your right match in a way which corresponds to both of your wishes and needs.
          </p>
        </section>}
        {(about === 'team') && <section className="about-developers">
          <div className="developer-preview">
            <div className="member1">
              <img className="member1-img" src='../assets/images/daniel2.jpeg' alt="" onClick={() => this.onToggleDeveloper('daniel')} />
              <h3 className="member1-name">
                Daniel Davidson
              </h3>
            </div>
            <div className="member2">
              <img className="member2-img" src='../assets/images/itay.jpg' alt="" onClick={() => this.onToggleDeveloper('itay')}/>
              <h3>
                Itay Rotshtein
              </h3>
            </div>
            <div className="member3">
              <img className="member3-img" src='../assets/images/Oshri2.jpg' alt="" onClick={() => this.onToggleDeveloper('oshri')} />
              <h3>
                Oshri Hayke
              </h3>
            </div>
          </div>

          {developer && isDetails && <section className="developer-details">
            <button className="close-dev-details-modal" onClick={this.onToggleDetails}>X</button>
            {(developer === 'daniel') && <p>
              Til Programmer <br />
            Incharge of Backend wiring <br />
            Never stops working <br />
            Will build whatever your company needs....
            </p>}
            {(developer === 'itay') && <p>
              Til Programmer <br />
            Incharge of Backend wiring <br />
            Never stops working <br />
            Will build whatever your company needs....
            </p>}
            {(developer === 'oshri') && <p>
              Swiper Viper <br />
            scss bootcamp <br />
            Never stops working <br />
            Will build whatever your company needs....
            </p>}

          </section>}
        </section>}
        {(about === 'vision') ? <h2 className="about-toggle" onClick={this.onToggleAbout}>Our Team</h2> :
          <h2 className="about-toggle" onClick={this.onToggleAbout}>Our Vision</h2>}
      </section>
    );
  }
}
