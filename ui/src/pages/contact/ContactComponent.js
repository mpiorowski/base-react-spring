import React, {Component} from 'react';

class ContactComponent extends Component {
  render() {
    return (
        <div>
          <h1>Kontakt:</h1>
          <p>Email: <b><a href="mailto:mail@gmail.com">agata.rakowska@pbs.pl</a></b></p>
          <p>Telefon: <b>333 444 555</b></p>
        </div>
    );
  }
}

export default ContactComponent;
