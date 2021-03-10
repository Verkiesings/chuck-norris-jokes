import React from 'react';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import Loader  from '../components/Loader';

// GraphQL queries

const GET_CATEGORIES = gql`
  {
    categories {
      name
    }
  }
`;

const GET_JOKE = gql`
  query Joke($category: String) {
    random(category: $category) {
      value
    }
  }
`;

// Data via @apollo/react-hooks

function Categories({ onCategorySelected }) {
  const {
    loading,
    error,
    data: { categories },
  } = useQuery(GET_CATEGORIES);
  if (loading) return <Loader />;
  if (error) return `Error! ${error.message}`;
  return (
    <div className="joke">
      <center><div><h1>Change Category</h1></div></center>
      <center>
        <div>
          <select name="category" onChange={onCategorySelected}>
            {categories.map((category, id) => (
              <option className="name" key={id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </center>
      <style jsx>
        {`
        p {
          font-size: 20px;
          font-weight: 600;
          line-height: 40px;
          height: 40px;
          text-transform: uppercase;
          margin: 0;
        }
        select {
          -webkit-appearance: none;
          -moz-appearance: none;
          text-align-last: center;
          text-align: -webkit-center;
          min-width: 200px;
          font-size: 20px;
          font-weight: 600;
          letter-spacing: 1px;
          height: 42px;
          text-transform: uppercase;
          border: 2px solid var(--fg);
          background: var(--bg);
          color: var(--fg);
        }
      `}
      </style>
    </div>
  );
}

function Random({ category }) {
  const {
    loading,
    error,
    data: { random },
    refetch,
    networkStatus,
  } = useQuery(GET_JOKE, {
    variables: { category },
    notifyOnNetworkStatusChange: true,
  });

  if (networkStatus === 4) return <Loader />;
  if (loading) return <Loader />;
  if (error) return `${error}`;

  return (
    <div className="result">
      <p>{random.value}</p>
      <button type="button" onClick={() => refetch()}>Get New Joke</button>
      <style jsx>
        {`
        .result {
          background: var(--bg);
          padding-bottom: 40px;
        }
        p {
          font-size: 16px;
          font-weight: 300;
          line-height: 22px;
          text-align: center;
          margin: 20px auto;
          max-width: 400px;
          padding: 0 20px;
        }
        button {
          font-family: "Roboto", sans-serif;
          text-transform: uppercase;
          outline: 0;
          background: #4CAF50;
          width: 100%;
          border: 0;
          padding: 15px;
          color: #FFFFFF;
          font-size: 14px;
          -webkit-transition: all 0.3 ease;
          transition: all 0.3 ease;
          cursor: pointer;
          
        }
        button:hover {
          background: #43A047;
        }
      `}
      </style>
    </div>
  );
}

class Joke extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedCategory: 'animal' };
  }

  onCategorySelected = ({ target }) => {
    this.setState(() => ({ selectedCategory: target.value }));
  };

  render() {
    return (
      <div className="generator">
        <div>
          <Categories onCategorySelected={this.onCategorySelected} />
        </div>
        <div>
          {this.state.selectedCategory && (
            <Random category={this.state.selectedCategory} />
          )}
        </div>
        <style jsx>
          {`
          .generator {
            border-radius: 5px;
            margin-top: 40px;
          }
          .generator > div {
            position: relative;
            min-height: 100px;
          }
          @media screen and (max-width: 576px) {
            .generator {
              flex-direction: column;
              text-align: center;
            }
            .generator > div{
              flex: 0 0 100%;
            }
          }
        `}
        </style>
      </div>
    );
  }
}

export default Joke;
