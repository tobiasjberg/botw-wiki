import Head from 'next/head'
import Link from 'next/link'

export async function getStaticPaths() {
    const categoriesarray = ["creatures",  "equipment",  "materials",  "monsters",  "treasure"]
    const paths = categoriesarray.map((category) => ({ params: { category } }));
    return {
      paths,
      fallback: false,
    };
  }
  
  export async function getStaticProps({ params: { category } }) {
    const items = await fetch(`https://botw-compendium.herokuapp.com/api/v2/category/${category}`)
    const itemjson = await items.json()
    const itemData = itemjson.data
    return {
      props: {
        itemData: itemData,
        category: category
      },
    };
  };
  
  export default function ItemPage({itemData, category}) {
    if (category == "creatures") {
      itemData = itemData.food.concat(itemData.non_food)
    }
    return (
      <div>
        <Head>
          <title>{category.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())} - BOTW Items Wiki</title>
        </Head>
        <h1>{category.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</h1>
        {itemData.map(({ name, id }) => (
          <li key={id} className="card">
          <Link href={`/item/${id.toString().toLowerCase()}`}><a>{name.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</a></Link>
          </li>
        ))}
        <Link href="/"><a>Home</a></Link>
      </div>
    );
  };