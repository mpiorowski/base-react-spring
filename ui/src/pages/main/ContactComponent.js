import React, {Component} from 'react';

class ContactComponent extends Component {
  render() {
    return (
        <div>
          <h1>Kontakt:</h1>
          <p>Email: <b><a href="mailto:agata.rakowska@pbs.pl">agata.rakowska@pbs.pl</a></b></p>
          <p>Telefon: <b>696 042 610</b></p>
        </div>
    );
  }
}

export default ContactComponent;
