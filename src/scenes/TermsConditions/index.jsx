import React from 'react';
import { H2, Wysiwyg } from 'dynamicdelta';
import { HashLink as Link } from 'react-router-hash-link';
import styles from './styles';
import Footer from '../../components/Footer';
import Subscribe from '../../components/Subscribe';
import CompanyInfo from '../../components/CompanyInfo';

class TermsConditions extends React.Component {
  componentDidMount() {
    // eslint-disable-next-line no-undef
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className="container-fluid">
        <div style={{ height: 200 }} />
        <div className="row" style={{ marginBottom: 50 }}>
          <div className="col-xl-2 col-lg-2 col-md-1 col-sm-1 col-1" />
          <div className="col-xl-8 col-lg-8 col-md-10 col-sm-10 col-10 no-padding">
            <br /><br /><br />
            <h1 className="text-center">Terms Of Use</h1>
            <Wysiwyg componentID="1914d1cb-d9be-420f-a288-ecaef764b508" style={styles.padding} />
            <ol>
              <li><Link to="/termsconditions#question_1">Where can I find your Privacy Notice?</Link></li>
              <li><Link to="/termsconditions#question_2">What age do I have to be to use this Site?</Link></li>
              <li><Link to="/termsconditions#question_3">Do I have to create an account?</Link></li>
              <li><Link to="/termsconditions#question_4">How can I delete my account?</Link></li>
              <li><Link to="/termsconditions#question_5">How do I comply with intellectual property laws?</Link></li>
              <li><Link to="/termsconditions#question_6">I think my intellectual property rights have been infringed.</Link></li>
              <li><Link to="/termsconditions#question_7">Do you link to third party sites?</Link></li>
              <li><Link to="/termsconditions#question_8">Disclaimers and Limitations on Liability.</Link></li>
              <li><Link to="/termsconditions#question_9">Indemnity.</Link></li>
              <li><Link to="/termsconditions#question_10">What governing law applies?</Link></li>
              <li><Link to="/termsconditions#question_11">What if I live outside of the United States?</Link></li>
              <li><Link to="/termsconditions#question_12">Whom should you contact with questions or concerns?</Link></li>
              <li><Link to="/termsconditions#question_13">When was this notice last updated?</Link></li>
            </ol>

            <section id="question_1">
              <H2 componentID="2235c57a-f035-48f9-afcd-dc6fc9425960" className="text--underline" style={styles.questionHeading} />
              <Wysiwyg componentID="2b25e420-ceb1-431b-b074-1444a5b07e4c" style={styles.policyQuestions} />
            </section>

            <section id="question_2">
              <H2 componentID="4c8682ca-aab9-4b08-ba1f-64d59c663d29" className="text--underline" style={styles.questionHeading} />
              <Wysiwyg componentID="819c694b-6ce3-4ba0-b384-cc7a7dde097c" style={styles.policyQuestions} />
            </section>

            <section id="question_3">
              <H2 componentID="e9e5c14e-af5d-4633-ae6a-e8766a5e6245" className="text--underline" style={styles.questionHeading} />
              <Wysiwyg componentID="1317944d-949a-4c6c-a698-ac1929090917" style={styles.policyQuestions} />
            </section>

            <section id="question_4">
              <H2 componentID="5980fffa-d4a8-4d58-864e-1d4e40d54baa" className="text--underline" style={styles.questionHeading} />
              <Wysiwyg componentID="58103467-5b5a-41ff-a7aa-02d09aa42e95" style={styles.policyQuestions} />
            </section>

            <section id="question_5">
              <H2 componentID="7b8c4e42-3ed3-4374-85a7-eaccf72f2ef2" className="text--underline" style={styles.questionHeading} />
              <Wysiwyg componentID="2d55d97a-683e-47c1-b524-dc41296a944a" style={styles.policyQuestions} />
            </section>

            <section id="question_6">
              <H2 componentID="436d19a7-2add-427b-b522-a21f254d1cb9" className="text--underline" style={styles.questionHeading} />
              <Wysiwyg componentID="b3ebe49f-9bb5-4eb8-ad9a-6db0dde55b39" style={styles.policyQuestions} />
            </section>

            <section id="question_7">
              <H2 componentID="3409232f-b510-4f7f-bc95-61f14a9d8168" className="text--underline" style={styles.questionHeading} />
              <Wysiwyg componentID="451cfad0-0f38-4929-869a-ddb8398c57b7" style={styles.policyQuestions} />
            </section>

            <section id="question_8">
              <H2 componentID="88c99734-545f-42ee-b76b-6cc390509810" className="text--underline" style={styles.questionHeading} />
              <Wysiwyg componentID="d19af841-ccb3-4c04-ac28-ac1264d05c7b" style={styles.policyQuestions} />
            </section>

            <section id="question_9">
              <H2 componentID="25270006-75f8-497a-98f0-91d4160a26b8" className="text--underline" style={styles.questionHeading} />
              <Wysiwyg componentID="1c1ead95-9327-4774-909c-f7c07bc49f79" style={styles.policyQuestions} />
            </section>

            <section id="question_10">
              <H2 componentID="9fc727a8-cd76-4683-b300-385d0005b873" className="text--underline" style={styles.questionHeading} />
              <Wysiwyg componentID="f5a9d687-b959-4e71-a975-b1b63a3beedf" style={styles.policyQuestions} />
            </section>

            <section id="question_11">
              <H2 componentID="510405a8-680b-410a-9958-a106fa684ec8" className="text--underline" style={styles.questionHeading} />
              <Wysiwyg componentID="0a94aeea-6879-4c2e-93fe-fd1bc0d50daa" style={styles.policyQuestions} />
            </section>

            <section id="question_12">
              <H2 componentID="1e76f1d0-dfba-4e96-9bfa-f0b4ae99d54d" className="text--underline" style={styles.questionHeading} />
              <Wysiwyg componentID="c68c64f4-8a2a-4243-9bfe-09d63d00a47d" style={styles.policyQuestions} />
            </section>

            <section id="question_13">
              <H2 componentID="1ca79e32-3d0e-47b7-8c59-339586619909" className="text--underline" style={styles.questionHeading} />
              <Wysiwyg componentID="9e3721c9-110b-4b27-8dc8-5d24779f15af" style={styles.policyQuestions} />
            </section>

          </div>
        </div>
        <Subscribe />
        <Footer />
        <CompanyInfo />
      </div>
    );
  }
}

export default TermsConditions;
