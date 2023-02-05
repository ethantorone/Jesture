import './Cup.css'

function Cup(props) {
    return (
        <div id="container">
            <div class="steam" id="steam1"> </div>
            <div class="steam" id="steam2"> </div>
            <div class="steam" id="steam3"> </div>
            <div class="steam" id="steam4"> </div>

            <div id="cup">
                <div id="cup-body">
                    <div id="cup-shade"></div>
                </div>
                <div id="cup-handle"></div>
            </div>

        </div>
    )
}

export default Cup;