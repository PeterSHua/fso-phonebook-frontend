import ContactDetails from './ContactDetails';
import contactService from '../services/contacts';

const ContactList = ({ persons, setPersons }) => {
  const clickDeleteHandler = (event) => {
    let id = event.target.dataset.id;

    (async () => {
      let deleteIdx = contactService.findPersonIdx(id, persons);

      if (window.confirm(`Delete ${persons[deleteIdx].name}?`)) {
        try {
          await contactService.deleteContact(id);

          let newPersons = [...persons];
          newPersons.splice(deleteIdx, 1);

          setPersons(newPersons);
        } catch {
          alert('Failed to delete');
        }
      }
    })();
  };

  return persons.map((person) => {
    return (
      <ContactDetails
        key={person.id}
        id={person.id}
        name={person.name}
        number={person.number}
        clickDeleteHandler={clickDeleteHandler}>
      </ContactDetails>
    );
  });
}

export default ContactList;
