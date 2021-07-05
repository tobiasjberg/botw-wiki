import Head from 'next/head'
import Link from 'next/link'

export async function getStaticPaths() {
  const res = await fetch('https://botw-compendium.herokuapp.com/api/v2')
  const resjson = await res.json()
  const data = resjson.data
  const creaturesfoodarray = data.creatures.food
  const creaturesnonfoodarray = data.creatures.non_food
  const equipmentarray = data.equipment
  const materialsarray = data.materials
  const monstersarray = data.monsters
  const treasurearray = data.treasure
  const creaturesfoodarrayids = creaturesfoodarray.map((creaturesfood) => creaturesfood.id);
  const creaturesnonfoodarrayids = creaturesnonfoodarray.map((creaturesnonfood) => creaturesnonfood.id);
  const equipmentarrayids = equipmentarray.map((equipment) => equipment.id);
  const materialsarrayids = materialsarray.map((materials) => materials.id);
  const monstersarrayids = monstersarray.map((monsters) => monsters.id);
  const treasurearrayids = treasurearray.map((treasure) => treasure.id);
  const ids = creaturesfoodarrayids.concat(creaturesnonfoodarrayids, equipmentarrayids, materialsarrayids, monstersarrayids, treasurearrayids)
  const paths = ids.map((id) => ({ params: { id: id.toString() } }));
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params: { id } }) {
  const items = await fetch(`https://botw-compendium.herokuapp.com/api/v2/entry/${id}`)
  const itemjson = await items.json()
  const itemData = itemjson.data
  return {
    props: {
      itemData: itemData
    },
  };
};

export default function ItemPage({itemData}) {
  return (
    <div>
      <Head>
        <title>{itemData.name.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())} - BOTW Items Wiki</title>
      </Head>
      <h1>{itemData.name.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</h1>
      <p>Category: {itemData.category.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</p>
      <p>{itemData.description}</p>
      <p>Back to <Link href="/"><a>Home</a></Link> or <Link href={`/${itemData.category.toLowerCase()}`}><a><span>{itemData.category.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}</span></a></Link></p>
    </div>
  );
};