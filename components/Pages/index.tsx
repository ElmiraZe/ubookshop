import Component, { PageEl } from '@/components/Libs/Component';
import Copy from '@/components/Libs/Copy';
import Router from 'next/router'
import Window from '@/components/Libs/Window';
import TextBox from '@/components/Libs/TextBox';
import Icon2Titles from '@/components/Libs/Icon2Titles';
import Icon3Titles from '@/components/Libs/Icon3Titles';
import css from './css.module.css'
import "./css.module.css"
import WindowFloat from '../Libs/WindowFloat';
import { Block } from './Block';



export default p => Component(p, Page);
const Page: PageEl = (props, state, refresh, getProps) => {
  getProps(async () => {
    let cart = localStorage.getItem("cart")
    if (cart) {
      state.cart = JSON.parse(cart)
    }

    let faves = localStorage.getItem("faves")
    if (faves) {
      state.faves = JSON.parse(faves)
    }
  })


  let styles = global.styles




  if (!state.cart) {
    state.cart = []
  }
  let total_price = 0

  for (let title of state.cart) {
    let book = props.books.find(b => b.title == title)
    if (book) {
      total_price += (book.price * 1.2)
    }
  }



  return (


    <div style={{ direction: "ltr", width: "calc(100% - 20px)", minHeight: "11vh" }}>
      <br-x />

      {state.form == "bookspecs" ? <WindowFloat title="Book Specifications"
        style={{ backgroundColor: 'ivory' }}
        onclose={() => {

          delete state.form
          refresh()


        }}>

        <c-x style={{ padding: "0px 30px" }}>

          <f-c>
            <f-15>Title :</f-15>
            <sp-2 />
            <f-14>{state.book.title}</f-14>
          </f-c>

          <f-c>
            <f-15>Author :</f-15>
            <sp-2 />
            <f-14>{state.book.author}</f-14>
          </f-c>

          <f-c>
            <f-15>Country :</f-15>
            <sp-2 />
            <f-14>{state.book.country}</f-14>
          </f-c>

          <f-c>
            <f-15>Language :</f-15>
            <sp-2 />
            <f-14>{state.book.language}</f-14>
          </f-c>

          <f-c>
            <f-15>Pages :</f-15>
            <sp-2 />
            <f-14>{(state.book.pages as number)}</f-14>
          </f-c>

          <f-c>
            <f-15>Year :</f-15>
            <sp-2 />
            <f-14>{(state.book.year as number)}</f-14>
          </f-c>

        </c-x>

        <br-x/>

        <f-cse>


          <g-b style={{
            height: 30, width: "80%", backgroundColor:
              state.cart.includes(state.book.title) ? "peachpuff" : "#D2F6C3"
          }}
            onClick={() => {

              if (state.cart.includes(state.book.title)) {
                state.cart = state.cart.filter(bookname => state.book.title != bookname)
                state.form = null
                refresh()
                // await api("/api/test",state.cart)
              }
              else {
                state.cart.push(state.book.title)
                state.form = null
                refresh()
              }

            }}>


            {state.cart.includes(state.book.title) ? <f-14>Remove From Basket</f-14> : <f-14>Add To Basket</f-14>}

          </g-b>


          <g-b style={{ height: 30, backgroundColor: 'snow' }}
            onClick={() => {

              if (state.faves.includes(state.book.title)) {
                state.faves = state.faves.filter(bookname => state.book.title != bookname)
                localStorage.setItem("faves", JSON.stringify(state.faves))
                state.form = null
                refresh()
              }
              else {
                state.faves.push(state.book.title)
                localStorage.setItem("faves", JSON.stringify(state.faves))
                state.form = null
                refresh()
              }

            }}>



            <img src={state.faves.includes(state.book.title) ?
              "https://cdn.ituring.ir/research/7/broken%20heart.png" :
              "https://cdn.ituring.ir/research/7/redheart.png"}

              style={{
                height: 20, width: 20, objectFit: "contain",
                position: "absolute"

              }} />


          </g-b>
        </f-cse>

      </WindowFloat> : null}

      <Window title={"Shopping Cart"} style={{
        minHeight: 200, margin: 10, width: "calc(100% - 20px)",
        backgroundImage: 'url("https://cdn.ituring.ir/research/7/wallpaper.webp")',
        backgroundSize: 'cover'
      }}>

        <w-cse style={{ height: 120, width: "100%" }}>

          <img style={{ height: 90, width: 90 }} src="https://cdn.ituring.ir/research/7/money.png" />

          <img style={{ height: 70, width: 70 }} src="https://cdn.ituring.ir/research/7/book2.png" />



        </w-cse>
        <w-cse style={{ width: "100%", marginLeft: 20 }}>

          <f-16 style={{ fontWeight: 'bold' }}>

            Price :
            <sp-4/>
            {total_price} T

          </f-16>



          <f-16 style={{ fontWeight: 'bold' }} >

            Number Of Books :
            <sp-4/>
            {state.cart.length}
            <sp-2/>
            

          </f-16>


        </w-cse>
      </Window>

      <Window title={"Basket"} style={{ minHeight: 200, margin: 10, width: "calc(100% - 20px)", direction: 'rtl', backgroundColor: "rgb(248 237 184)" }}>

        <w-cse>

          {props.books.map(book => {
            return <Block
              book={book}
              state={state}
              refresh={refresh}
            />
          })}

        </w-cse>


      </Window>
    </div >
  )
}


export async function getServerSideProps(context) {


  var session = await global.SSRVerify(context)
  var { uid, name, image, imageprop, lang, cchar,
    unit, workspace, servid, servsecret,
    usedquota, quota, quotaunit, status, regdate, expid,
    role, path, devmod, userip, } = session;

  let books = await global.db.collection("books").find({}).toArray()

  for (let book of books) {

    book.imageLink = "https://cdn.ituring.ir/research/ex/books/" + book.imageLink

  }


  return {
    props: {
      data: global.QSON.stringify({
        session,
        books,
        // nlangs,
      })
    },
  }
}