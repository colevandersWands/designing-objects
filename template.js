console.log('--- define the data ---');
  
  // build an object literal to model your problem
  //  we provide this
  const example_team_roster = {
    roger: {position: '', number: 1},
    peter: {position: '', number: 2},
    orik: {position: '', number: 3},
  }
  

console.log('--- develop manipulations as pure functions ---');

  // code them as pure functions
  //  we provide these as user stories
  //  they write tests & develop the methods

  function add_player(roster, player_obj) {
    const new_roster = JSON.parse(JSON.stringify(roster));
    new_roster[player_obj.name] = player_obj
    delete player_obj.name
    return new_roster
  }
  // test_function(add_player, add_player_tests)

  function remove_player_by_name(roster, player_name) {
    const new_roster = JSON.parse(JSON.stringify(roster));
    delete new_roster[name]
    return new_roster
  }
  // test_function(remove_player_by_name, remove_player_by_name_tests)

  function remove_player_by_number(roster, number) {
    const new_roster = JSON.parse(JSON.stringify(roster));
    for (let player in new_roster) {
      if (new_roster[player].number === number) {
        delete new_roster[player]
        break
      }
    }
    return new_roster
  }
  // test_function(remove_player_by_number, remove_player_by_number_tests)

  function update_player(roster, name, new_info) {
    const new_roster = JSON.parse(JSON.stringify(roster));
    new_roster[name] = new_info
    return new_roster
  }
  // test_function(update_player, update_player_tests)


console.log('--- objectify & method-test ---');

  // put it in an oop
  //  get rid of data structure arg
  //  get rid of return values
  //  replace all instances of ds arg with this.structure
  //  write a getter & setter for the data structure
  const oop_roster = {
    roster: {},
    get_roster: function () {
      return JSON.parse(JSON.stringify(this.roster));
    },
    set_roster: function (new_roster) {
      this.roster = JSON.parse(JSON.stringify(new_roster))
    },
    add_player: function (player_obj) {
        this.roster[player_obj.name] = JSON.parse(JSON.stringify(player_obj))
        delete this.roster[player_obj.name].name
      },
    remove_player_by_name: function (player_name) {
        delete this.roster[player_name]
      },
    remove_player_by_number: function (number) {
        for (let player in this.roster) {
          if (this.roster[player].number === number) {
            delete this.roster[player]
            break
          }
        }
      },
    update_player: function ( name, new_info) {
        this.roster[name] = JSON.parse(JSON.stringify(new_info))
      }
  }

  // try hitting fringe cases with your tests

  const add_player_tests = [
    {it_should: 'add players', actions: [
      {method: 'set_roster', args: [{}], expected: undefined},
      {method: 'add_player', args: [{name: 'i', position: 'i', number: 'i'}], expected: undefined},
      {method: 'get_roster', args: [], expected: {i: {position: 'i', number: 'i'}}}]}
  ]
  test_object(oop_roster, add_player_tests);

  const remove_by_name_tests = [
    {it_should: 'remove player by name', actions: [
      {method: 'set_roster', args: [{}], expected: undefined},
      {method: 'add_player', args: [{name: 'i', position: 'i', number: 'i'}], expected: undefined},
      {method: 'get_roster', args: [], expected: {i: {position: 'i', number: 'i'}}},
      {method: 'remove_player_by_name', args: ['i'], expected: undefined},
      {method: 'get_roster', args: [], expected: {}}]}
  ]
  test_object(oop_roster, remove_by_name_tests);


  const remove_by_number_tests = [
    {it_should: 'remove player by number', actions: [
      {method: 'set_roster', args: [{}], expected: undefined},
      {method: 'add_player', args: [{name: 'i', position: 'i', number: 'i'}], expected: undefined},
      {method: 'get_roster', args: [], expected: {i: {position: 'i', number: 'i'}}},
      {method: 'remove_player_by_number', args: ['i'], expected: undefined},
      {method: 'get_roster', args: [], expected: {}}]}
  ]
  test_object(oop_roster, remove_by_number_tests);


  const update_player_tests = [
    {it_should: 'update player by name', actions: [
      {method: 'set_roster', args: [{i: {position: 'i', number: 'i'}}], expected: undefined},
      {method: 'update_player', args: ['i', {position: 'j', number: 'j'}], expected: undefined},
      {method: 'get_roster', args: [], expected: {i: {position: 'j', number: 'j'}}}]}
  ]
  test_object(oop_roster, update_player_tests);


console.log('--- write a behavioral test suite ---')

/*
  more complex & full use cases that a real person might do
  if you do these right you won't want to name them after a single method
    because they're about a desired final outcome, not any single method
*/










// testing utilities


function test_function(_target, _cases, _log) {
  for (let t_case of _cases) {
    let expected = t_case.expected;

    let actual;
    let msg;
    let log;
    if (_log) {
      log = _target(... t_case.args, true);
      actual = log.result;
    } else {
      actual = _target(... t_case.args, false);
    };

    let pass;
    if (typeof expected === 'object') {
      const _actual = JSON.stringify(actual);
      const _expected = JSON.stringify(expected);
      pass = _actual === _expected;
    } else {
      pass = actual === expected;
    };

    if (!pass && _log) {
      console.log(`    ${t_case.name}: \n` + 
          "actual: ", log, "\n" +
          `expected: {${typeof expected}, ${expected}}`);
    } else if (!pass) {
      console.log(`${t_case.name}: \n` + 
          `   actual: {${typeof actual}, ${actual}} \n` +
          `   expected: {${typeof expected}, ${expected}}`);
    };
  };
};

function test_object(_obj, _tests) {
  let log = [];
  for (let test of _tests) {
    let entry = { it_should: test.it_should };
    let result = run_actions(_obj, test.actions);
    if (result !== true) {
      entry.errors = result
    }
    log.push(entry)
  }
  console.log(log)

  function run_actions(_obj, _cases) {
    let log = {};
    for (let i = 0; i < _cases.length; i++) {

      let result = method_assert(_obj, _cases[i]);
      if (result !== true) {
        log[i+1] = result;
      }

    };
    if (Object.keys(log).length === 0) {
      return true
    } else {
      return log
    }
  };

  function method_assert(_object, _test) {
    let method = _test.method;
    let args = _test.args;
    let expected = _test.expected;

    let actual = _object[method](...args);

    let pass;
    if (typeof expected === 'object') {
      let _actual = JSON.stringify(actual);
      let _expected = JSON.stringify(expected);
      pass = _actual === _expected;
    } else {
      pass = actual === expected;
    };

    if (pass) {
      return true
    } else {
      return { method, actual, expected  }
    };
  };

}


