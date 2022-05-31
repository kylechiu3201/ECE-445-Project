import './App.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import lists from './lists.json';

const lists = require('./lists.json');
const list_types = ['prog_white', 'prog_black', 'web_white', 'web_black'];
const list_type_to_title = {prog_white: 'Whitelisted Applications: ', prog_black: 'Blacklisted Applications: ', web_white: 'Whitelisted Websites: ', web_black: 'Blacklisted Websites: '};
const list_type_to_color = {prog_white: 'Lime', prog_black: 'Red', web_white: 'Lime', web_black: 'Red'};
const type_to_use_type = {Application: 'prog_', 'Website URL': 'web_'};
const type_to_list_type = {Whitelist: 'white', Blacklist: 'black'};

function App() {

    function handleAdd() {
        var name = document.getElementById('name').value;
        if(name === '') return;
        var type = document.getElementById('name_type').value;
        var add_to = document.getElementById('list_type').value;
        var full_type = type_to_use_type[type]+type_to_list_type[add_to];
        document.getElementById('name').value = '';
        lists[full_type].push(name);
        writeAPI();
    }

    function handleRemove(list_type, ind) {
        lists[list_type].splice(ind, 1);
        writeAPI();
    }

    function writeAPI() {
        fetch('http://localhost:3000/write_to_json/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(lists)
        });
    }

    return (
        <div className="App" style={{ margin: '30px' }}>
            <div style={{ textAlign: 'center', fontWeight: 'bold', fontFamily: 'Helvetica' }}>
                <label style={{ fontSize: '25px', fontWeight: 'bold' }}>
                    Enter Application Name/Website URL:
                </label>
                <br></br>
                <input id="name" placeholder="e.g. www.youtube.com, discord, etc." style={{ width: '300px', textAlign: 'center', margin: '5px' }} onKeyPress={(e) => {if(e.key === 'Enter') { handleAdd(); }}}>
                </input>
                <br></br><br></br>
                <label>
                    Type:
                </label>
                <select id='name_type' style={{ margin: '5px' }}>
                    <option value="Application">Application</option>
                    <option value="Website URL">Website URL</option>
                </select>
                <br></br>
                <label>
                    Add To:
                </label>
                <select id="list_type" style={{ margin: '5px' }}>
                    <option value="Blacklist">Blacklist</option>
                    <option value="Whitelist">Whitelist</option>
                </select>
                <br></br><br></br>
                <input className="add" type="button" name="add" value="Add!" onClick={handleAdd}>
                </input>
                <br></br><br></br><br></br>
            </div>
            <div id='show_lists'>
                <Container>
                    <Row>
                        {[list_types[0], list_types[1]].map((list_type, idx) => 
                            <Col key={list_type+idx}>
                                <span style={{ fontWeight: 'bold', color: list_type_to_color[list_type] }}>
                                    {list_type_to_title[list_type]}
                                </span>
                                {lists[list_type].map((data, ind) => 
                                    <div style={{ textAlign: 'center' }} key={data+ind}>
                                        <span>{data} </span>
                                        <input type="button" value="Remove" id="remove" onClick={() => handleRemove(list_type, ind)}>
                                        </input>
                                        <br></br>
                                    </div>
                                )}
                            </Col>
                        )}
                    </Row>
                    <br></br>
                    <Row>
                        {[list_types[2], list_types[3]].map((list_type, idx) => 
                            <Col key={list_type+idx}>
                                <span style={{ fontWeight: 'bold', color: list_type_to_color[list_type] }}>
                                    {list_type_to_title[list_type]}
                                </span>
                                {lists[list_type].map((data, ind) => 
                                    <div style={{ textAlign: 'center' }} key={data+ind}>
                                        <span>{data} </span>
                                        <input type="button" value="Remove" id="remove" onClick={() => handleRemove(list_type, ind)}>
                                        </input>
                                        <br></br>
                                    </div>
                                )}
                            </Col>
                        )}
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default App;

// await writeJsonFile('foo.json', {foo: true});
