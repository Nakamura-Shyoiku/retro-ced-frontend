import React from 'react';
import { H1, H2, Wysiwyg } from 'dynamicdelta';
import styles from './styles';
import './style.css';
import Footer from '../../components/Footer';
import Subscribe from '../../components/Subscribe';
import CompanyInfo from '../../components/CompanyInfo';

class PrivacyPolicy extends React.Component {
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
            <H1
              componentID="834ce27e-cb5c-4c2a-8af1-ec34ffba202a"
              className="text-center"
            />
            <Wysiwyg componentID="292e3bf4-02f3-421d-83ff-aca6d0e620ba" style={styles.padding} />

            <Wysiwyg componentID="5190885d-b889-4960-8d5f-abf494d78567" style={styles.policyQuestions} />

            <section id="question_1">
              <H2 componentID="e9681c36-f8a3-4969-a8c8-39a5baf74c1c" className="text--underline" style={styles.questionHeading} />
              <Wysiwyg componentID="5efe2742-43c7-419e-8cb8-d5dd4ca7e006" style={styles.policyQuestions} />
            </section>

            <section id="question_2">
              <H2 componentID="9a334a4a-1d0c-4182-82a5-f63e85dd65ec" className="text--underline" style={styles.questionHeading} />
              <Wysiwyg componentID="15887d8b-49d3-485f-85fe-064b80fd2d58" style={styles.policyQuestions} />
            </section>

            <section id="question_3">
              <H2 componentID="9e8f2275-f055-44e9-b37b-4d36e9f29597" className="text--underline" style={styles.questionHeading} />
              <Wysiwyg componentID="530e7a8a-b413-4521-b0c4-f36c6fefbb13" style={styles.policyQuestions} />
            </section>

            <section id="question_4">
              <H2 componentID="54da7996-3586-4721-8458-e2634447bccf" className="text--underline" style={styles.questionHeading} />
              <Wysiwyg componentID="31d506bf-2926-4f33-97e0-2545e4598a06" style={styles.policyQuestions} />
            </section>

            <section id="question_5">
              <H2 componentID="8da7bf80-1581-466a-b22d-712acb229b1f" className="text--underline" style={styles.questionHeading} />
              <Wysiwyg componentID="61c41517-2ce8-48cf-aced-60eb90a0c1c6" style={styles.policyQuestions} />
            </section>

            <section id="question_6">
              <H2 componentID="9f8d7912-b5eb-4351-bcdc-c3bc5785a85b" className="text--underline" style={styles.questionHeading} />
              <Wysiwyg componentID="138b1d47-2fe3-4ed9-9210-7648697f05ef" style={styles.policyQuestions} />
            </section>

            <section id="question_7">
              <H2 componentID="d7293e56-cdc7-4176-82d2-bb58a6517869" className="text--underline" style={styles.questionHeading} />
              <Wysiwyg componentID="e366075f-3118-4c54-bf48-7d564bafc9b0" style={styles.policyQuestions} />
            </section>

            <section id="question_8">
              <H2 componentID="47beddac-93dd-405c-9b37-2c520a894ef8" className="text--underline" style={styles.questionHeading} />
              <Wysiwyg componentID="433ea942-1b34-4eca-bac3-128894328e46" style={styles.policyQuestions} />
            </section>

            <section id="question_9">
              <H2 componentID="646f6226-fe11-43cf-be20-f6022e32b4cd" className="text--underline" style={styles.questionHeading} />
              <Wysiwyg componentID="4102ef96-0152-40b8-afdc-652fac46b43a" style={styles.policyQuestions} />
            </section>

            <section id="question_10">
              <H2 componentID="fd37fb8a-c346-4f5b-add9-604c783f94e7" className="text--underline" style={styles.questionHeading} />
              <Wysiwyg componentID="c44bc540-5089-44f8-9572-0e1aca16aaa1" style={styles.policyQuestions} />
            </section>

            <section id="question_11">
              <H2 componentID="31cbd271-41e3-40d3-b446-d5ddf5e73fd7" className="text--underline" style={styles.questionHeading} />
              <Wysiwyg componentID="acde1fc6-82e5-4826-ba7c-b9744160d2bf" style={styles.policyQuestions} />
            </section>

            <section id="question_12">
              <H2 componentID="9856ac4b-dd55-47f4-87fc-d040d7fdf629" className="text--underline" style={styles.questionHeading} />
              <Wysiwyg componentID="f998051f-7b7a-4275-beee-462b1c5058df" style={styles.policyQuestions} />
            </section>

            <section id="question_13">
              <H2 componentID="f59f8b44-695c-40cc-a33e-dbc6af5b4197" className="text--underline" style={styles.questionHeading} />
              <Wysiwyg componentID="c797d9e5-a007-4077-9b5b-ae69dfcd6c8e" style={styles.policyQuestions} />
            </section>

            <section id="question_14">
              <H2 componentID="393dcdb4-629f-4763-baac-1b7d819d9edd" className="text--underline" style={styles.questionHeading} />
              <Wysiwyg componentID="c00bc816-c570-447b-9cdf-b0e3ee14de7c" style={styles.policyQuestions} />
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

export default PrivacyPolicy;
