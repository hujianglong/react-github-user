import React from 'react';
import styled from 'styled-components';
import { GithubContext } from '../context/context';
import { ExampleChart, Pie, Column3D, Bar, Doughnut2D } from './Charts';
const Repos = () => {
  const {repos} = React.useContext(GithubContext);
  
  const languages = repos.reduce((total,item)=>{
    const {language,stargazers_count} = item;
    if(!language) return total
    if(!total[language]){
      total[language]={label:language,value:1,stars:1}
    }
    else{
      total[language]= {...total[language],
        value:total[language].value+1,
        stars:total[language].stars+stargazers_count
      }
    }
    return total
  },{})
 

  const mostLanguage = Object.values(languages).sort((a,b)=>{
    return b.value-a.value;
  }).slice(0,5);


  // STEP 2 - Chart Data
  const mostPopular = Object.values(languages).sort((a,b)=>{
    return b.stars-a.stars;
  }).map((item)=>{
    return {...item,value:item.stars}
  }).slice(0,5);
  
  let { stars, forks } = repos.reduce(
    (total, item) => {
      const { stargazers_count, name, forks } = item;
      total.stars[name] = { label: name, value: stargazers_count };
      total.forks[name] = { label: name, value: forks };
      return total;
    },
    {
      stars: {},
      forks: {},
    }
  );
  stars = Object.values(stars).sort((a,b)=>{
    return a.value-b.value
  }).slice(-5).reverse();
  forks = Object.values(forks).sort((a,b)=>{
    return a.value-b.value
  }).slice(-5).reverse();

  return <section className='section'>
    <Wrapper className='section-center'>
    <Pie data={mostLanguage}/>
    <Column3D data={stars}/>
    <Doughnut2D data={mostPopular}/>
    <Bar data={forks} />
    </Wrapper>
  </section> 
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;