import { dark } from "@mui/material/styles/createPalette"

export const Block = props => {


    if (!props.state.cart) {
        props.state.cart = []
    }

    if (!props.state.faves) {
        props.state.faves = []
    }

    let size = props.state.cart.includes(props.title) ? 25 : 20


    return <c-c style={{
        width: 150, flex: 1, minWidth: 150, position: "relative", backgroundColor: "rgb(244 240 238)",
        borderRadius: 10, margin: 10, boxShadow: "0px 0px 9px 2px rgba(0,0,0,0.43)"
    }}>
        <img
            className={global.styles.hover}
            src={props.book.imageLink}
            style={{
                width: "100%", height: 200, objectFit: "fill", minWidth: 150,
                borderTopLeftRadius: 10, borderTopRightRadius: 10,
            }}
            onClick={() => {
                props.state.form = "bookspecs"
                props.state.book = props.book
                props.refresh()

            }} />


        {props.state.faves.includes(props.book.title) ? <img src="https://cdn.turing.team/research/7/redheart.png"
            style={{
                height: 14, width: 20, objectFit: "contain",
                position: "absolute", top: 10, right: 10
            }} /> : null}


        <f-cc style={{ padding: "5px 8px", width: "100%", height: 40 }}>

            <f-13 style={{ textAlign: "center" }}>
                {props.book.title}
            </f-13>

        </f-cc>

        <hr style={{ width: "60%", opacity: 0.2 }} />

        <f-csb style={{ padding: "5px 0", width: "100%" }}>
            <f-12>
                <sp-2>
                    <img src={props.state.cart.includes(props.book.title) ?
                        "https://cdn.turing.team/qepal/ok.svg" :
                        "https://cdn.turing.team/research/7/basket.webp"}
                        style={{ height: size, width: size, objectFit: "contain", margin: "0 10px" }} />
                </sp-2>
            </f-12>

            <c-x style={{ direction: "ltr", margin: "0 10px" }}>

                <f-12 style={{ color: "rgb(238 130 58)" }}>
                    <del>
                        {1.2 * props.book.price} T
                    </del>
                </f-12>

                <f-15 style={{ color:"rgb(28 16 9)"}}>
                    {props.book.price} T
                </f-15>
            </c-x>


        </f-csb>

    </c-c>
}


