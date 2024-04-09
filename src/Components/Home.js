import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import ImgCard from './ImgCard';
import { auth } from './Firebase';
import firebaseDB from './Firebase';
import { Modal } from 'react-bootstrap';
import emailjs from "@emailjs/browser";

const Home = ({ presentUser }) => {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);
  const [getData, setGetData] = useState({});
  const form = useRef();
  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_7q4oizq",
        "template_4ep4hwd",
        form.current,
        "kUp9_IX4ySGr4Fe2S"
      )
      .then(
        (result) => {
          console.log(result.text);
          console.log("message sent");
          window.alert("Message sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  const navigate = useNavigate();

  const handler = e => {
    setSearch(e.target.value);
  };

  const navigateWish = () => {
    navigate('/wishlist');
  };

  const navigateDiscussions = () => {
    navigate('/discussions');
  };

  useEffect(() => {
    axios.get('https://api.coinlore.net/api/tickers/').then(
      res => setData(res.data.data)
    );
    let ans = "", s = presentUser.email;
    for (let i = 0; i < s.length; i++) {
      if (s[i] !== '@') {
        ans = ans + s[i];
      }
      else {
        break;
      }
    }

    firebaseDB.child(ans).on('value', details => {
      if (details.val() === null || details.val() === undefined) {
        return;
      }
      else {
        setGetData(details.val());
      }
    });
  }, []);

  var count = Object.keys(getData).length;

  return (
    <>
      <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark pt-3 pb-2 navbar-fixed-top">
          <div className="container">
            <div className="nav-item float-start">
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav ml-auto">
                  <li><svg xmlns="http://www.w3.org/2000/svg" width={26} height={26} fill="gold" className="bi bi-graph-up-arrow" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M0 0h1v15h15v1H0V0Zm10 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4.9l-3.613 4.417a.5.5 0 0 1-.74.037L7.06 6.767l-3.656 5.027a.5.5 0 0 1-.808-.588l4-5.5a.5.5 0 0 1 .758-.06l2.609 2.61L13.445 4H10.5a.5.5 0 0 1-.5-.5Z" />
                  </svg></li>&nbsp;&nbsp;
                  <li> <h5 className="text-light">{presentUser.email}</h5></li>
                </ul>
              </div>
            </div>
            <div className="nav-item float-end">
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav ml-auto px-3">
                  <li><button className='btn btn-outline-warning' onClick={navigateWish}>WishList<span className="position-absolute badge rounded-pill bg-danger text-light">
                    {count}
                  </span></button></li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <button className="btn btn-outline-warning" onClick={handleModalOpen}>Contact Me</button>
                  <Modal show={showModal} onHide={handleModalClose} style={{ height: "550px" }}>
                    <Modal.Header className='bg-dark text-light'>
                      <Modal.Title>
                        <h4>Hello User &#128516;
                        </h4>
                      </Modal.Title>
                      <button className='btn btn-success float-end' onClick={handleModalClose}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                      </svg></button>
                    </Modal.Header>
                    <div className='contact'>
                      <p>&nbsp;&nbsp; Feel Free to Contact me whenever you , </p>
                      <ul>
                        <li>
                          <small>Need help !</small>
                        </li>
                        <li>
                          <small>If you have any ideas or suggestions to share, you are Appreciated !</small>
                        </li>
                        <li>
                            <small>Found any Bug? Let me know !</small>
                          </li>
                        </ul>
                        <Modal.Body>
                          <form ref={form} onSubmit={sendEmail}>
                            <input className='input2' type="text" name="from_name" placeholder='Your Name' /><br />
                            <input className='input2' type="email" name="email_id" placeholder='Your Email id' /><br />
                            <textarea className='input2' type="text" name="message" placeholder='Enter the Message here...' cols={55} rows={5} /><br />
                            <button className='btn btn-success justify-content-center' type="submit">Send</button>
                          </form>
                        </Modal.Body>
                    </div>
                  </Modal>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <li><button className='btn btn-outline-light' onClick={() => auth.signOut()}>LogOut</button></li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
      <div className="header">
        <input className='input1' value={search} onChange={handler} placeholder="Search for a Crypto" />
      </div>
      {
        data.length > 0 &&
        <div className='grid-container justify-content-center'>
          {data.filter(crypto =>
            crypto.name.toLowerCase().includes(search.toLowerCase())).map(index =>
              <div key={index.id}>
                <ImgCard
                  emailid={presentUser.email}
                  name={index.name}
                  rank={index.rank}
                  price={index.price_usd}
                  marketCap={index.market_cap_usd}
                  url={index.symbol}
                  hour={index.percent_change_1h}
                  day={index.percent_change_24h}
                  week={index.percent_change_7d}
                />
              </div>
            )}
        </div>
      }
    </>
  )
}

export default Home
