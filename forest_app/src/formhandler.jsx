import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MyComponent = () => {
  const [form1Data, setForm1Data] = useState({ field1: '', field2: '' });
  const [form2Data, setForm2Data] = useState({ choice_field: '', other_field: '' });
  const [savedInstances, setSavedInstances] = useState([]);

  useEffect(() => {
    axios.get('/api/form1/')
      .then(response => setSavedInstances(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleForm1Submit = (event) => {
    event.preventDefault();
    axios.post('/api/form1/', form1Data)
      .then(response => {
        setSavedInstances([...savedInstances, response.data]);
        setForm1Data({ field1: '', field2: '' });
      })
      .catch(error => console.error(error));
  };

  const handleForm2Submit = (event) => {
    event.preventDefault();
    axios.post('/api/form2/', form2Data)
      .then(response => {
        setForm2Data({ choice_field: '', other_field: '' });
      })
      .catch(error => console.error(error));
  };

  return (
    <div>
      <form onSubmit={handleForm1Submit}>
        <input
          type="text"
          value={form1Data.field1}
          onChange={(e) => setForm1Data({ ...form1Data, field1: e.target.value })}
          placeholder="Field 1"
        />
        <input
          type="text"
          value={form1Data.field2}
          onChange={(e) => setForm1Data({ ...form1Data, field2: e.target.value })}
          placeholder="Field 2"
        />
        <button type="submit">Save Form 1</button>
      </form>

      <form onSubmit={handleForm2Submit}>
        <select
          value={form2Data.choice_field}
          onChange={(e) => setForm2Data({ ...form2Data, choice_field: e.target.value })}
        >
          <option value="">Select an option</option>
          {savedInstances.map(instance => (
            <option key={instance.id} value={instance.id}>{instance.field1}</option>
          ))}
        </select>
        <input
          type="text"
          value={form2Data.other_field}
          onChange={(e) => setForm2Data({ ...form2Data, other_field: e.target.value })}
          placeholder="Other Field"
        />
        <button type="submit">Save Form 2</button>
      </form>
    </div>
  );
};

export default MyComponent;
