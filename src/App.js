import "./App.css";
import { useState } from "react";

function App() {
  const [state, setState] = useState("")
  const [form, setForm] = useState({
    type: "",
    typeCode: "",
    name: "",
    tag: "",
    messageStream: "",
    description: "",
    email: "",
    from: "",
    bouncedAt: "",
    token:""
  });

  const handleInputChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(form)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    try {
      setState("Sending POST Request...")
      const response = await fetch('http://127.0.0.1:4000/spamChecker', {
        method: 'POST',
        headers: myHeaders,
        body:
          JSON.stringify({
            "RecordType": "Bounce",
            "Type": form.type || "SpamNotification",
            "TypeCode": form.typeCode || 512,
            "Name": form.name || "Spam notification",
            "Tag": form.tag || "",
            "MessageStream": form.messageStream || "outbound",
            "Description": form.description || "The message was delivered, but was either blocked by the user, or classified as spam, bulk mail, or had rejected content.",
            "Email": form.email || "zaphod@example.com",
            "From": form.from || "notifications@honeybadger.io",
            "BouncedAt": form.bouncedAt || "2023-02-27T21:41:30Z",
            "token": form.token
          })
      });

      const result = await response.text();
      console.log(`Response from server: ${result}`);
      setState(result)
    } catch (error) {
      console.error(`Error sending spam message: ${error}`);
      setState(error)
    }

  };

  return (
    <div className="App  vh-100 d-flex flex-column">
      <div className="py-5">
        <div className="text-center">
          <h1 className="fw-bold">Spam Alert Endpoint for Slack Notifications</h1>
          <p className="lead">Built with React and Bootstrap for the frontend and Node.js for the backend</p>
        </div>
      </div>
      <div style={{ borderRadius: "10px" }} className="container bg-light p-5">
        <h3 style={{ marginBottom: "15px" }} className="fw-bold">JSON Object Form</h3>
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <label htmlFor="type" className="col-sm-2 col-form-label text-end">Type</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="type" value={form.type} onChange={handleInputChange}
              ></input>
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="typeCode" className="col-sm-2 col-form-label text-end">Type Code</label>
            <div className="col-sm-10">
              <input type="number" className="form-control" id="typeCode" value={form.typeCode} onChange={handleInputChange}
              ></input>
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="name" className="col-sm-2 col-form-label text-end">Name</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="name" value={form.name} onChange={handleInputChange}
              ></input>
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="tag" className="col-sm-2 col-form-label text-end">Tag</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="tag" value={form.tag} onChange={handleInputChange}
              ></input>
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="messageStream" className="col-sm-2 col-form-label text-end">Message Stream</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="messageStream" value={form.messageStream} onChange={handleInputChange}
              ></input>
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="description" className="col-sm-2 col-form-label text-end">Description</label>
            <div className="col-sm-10">
              <input className="form-control" id="description" rows="3" value={form.description} onChange={handleInputChange}
              ></input>
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="email" className="col-sm-2 col-form-label text-end">Email</label>
            <div className="col-sm-10">
              <input type="email" className="form-control" id="email" value={form.email} onChange={handleInputChange}
              ></input>
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="from" className="col-sm-2 col-form-label text-end">From</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="from" value={form.from} onChange={handleInputChange}
              ></input>
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="bouncedAt" className="col-sm-2 col-form-label text-end">Bounced At</label>
            <div className="col-sm-10">
              <input type="datetime-local" className="form-control" id="bouncedAt" value={form.bouncedAt} onChange={handleInputChange}
              ></input>
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="token" className="col-sm-2 col-form-label text-end">Slack Bot Token</label>
            <div className="col-sm-10">
              <input type="text" className="form-control" id="token" value={form.token} onChange={handleInputChange}
              ></input>
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary">Send Spam Alert Notification</button>
          </div>
          <div className="mt-5 text-center">
            {state}
          </div>
        </form>
      </div>

      <footer className="text-center  py-3">
        <p>Made with ❤️ by GuruF</p>
        <p>As mentioned in the project, I completed it within 2 Hours, But Its the frontend, that took time of 1.5 hours of extra time. (I know, it is not neccesary) </p>
      </footer>
    </div>
  );
}

export default App;
