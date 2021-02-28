import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import { Emoji, NimbleEmojiIndex } from "emoji-mart";
import data from "emoji-mart/data/google.json";
import { ThemeProvider, TextField, Container } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";

let searchTimerId = null;
const theme = createMuiTheme();

function App() {
  const [typingString, setTypingString] = useState("");
  const [emoji, setEmoji] = useState("");
  const [emojis, setEmojis] = useState([]);

  useEffect(() => {
    if (searchTimerId !== null) {
      clearTimeout(searchTimerId);
    }
    searchTimerId = setTimeout(() => {
      search();
    }, 500);
  }, [typingString]);

  useEffect(() => {
    setTimeout(() => {
      emojis.push(emoji);
      setEmojis(emojis);
      setEmoji("");
    }, 3000);
  }, [emoji]);

  function search() {
    const value = typingString;
    if (value === "") return;

    const emojiIndex = new NimbleEmojiIndex(data);
    const emojiArray = emojiIndex.search(value);
    const firstEmoji = emojiArray[0];
    if (!firstEmoji) return;

    if (value === firstEmoji["id"] || emojiArray.length === 1) {
      const emoji = {
        id: firstEmoji["id"],
        bottom: Math.floor(Math.random() * 20) - 10 + "px",
        right: Math.floor(Math.random() * 100) + 1 + "%",
      };

      setEmoji(emoji);
      setTypingString("");
    }
  }

  const RenderEmoji = ({ emoji, isOnly }) => (
    <div
      style={{
        position: "absolute",
        bottom: emoji.bottom,
        right: emoji.right,
      }}
    >
      {isOnly ? (
        <div className="animate__animated animate__fadeInDownBig animate__slower">
          <Emoji emoji={emoji} size={64} />
        </div>
      ) : (
        <div className="">
          <Emoji emoji={emoji} size={64} />
        </div>
      )}
    </div>
  );

  return (
    <ThemeProvider theme={theme}>
      <h1
        style={{
          position: "absolute",
          zIndex: -1,
          color: "#eee",
          fontSize: "2rem",
          fontFamily: "BlinkMacSystemFont",
          width: "120%",
          margin: "-50px -10px",
        }}
      >
        grinning　smiley　smile　grin　laughing　joy　wink　blush　innocent　kissing　
        relaxed　yum　hugging　expressionless　smirk　unamused　grimacing　relieved　
        pensive　sleepy　sleeping　mask　cowboy_hat　sunglasses　confused　worried　duck　
        swan　owl　flamingo　peacock　parrot　frog　crocodile　turtle　lizard　snake　
        hushed　astonished　flushed　frowning　anguished　fearful　cry　sob　scream　
        confounded　persevere　disappointed　sweat　weary　triumph　rage　angry　imp　
        skull　hankey　ghost　alien　wave　hand　v　+1　-1　fist　facepunch　clap　handshake　
        sheep　goat　dromedary_camel　camel　llama　giraffe_face　elephant　rhinoceros　
        baguette_bread　pretzel　bagel　pancakes　waffle　cheese_wedge　meat_on_bone　
        pray　selfie　muscle　leg　foot　ear　nose　brain　tooth　bone　eyes　eye　tongue　
        lips　baby　child　boy　girl　adult　man　woman　bow　shrug　cop　guardsman　prince　
        walking　runner　dancer　dancers　fencer　skier　snowboarder　golfer　surfer　
        rowboat　swimmer　bicyclist　wrestlers　handball　juggling　bath　couple　
        couplekiss　family　footprints　kiss　cupid　heartpulse　heartbeat　heart　100　
        monkey_face　monkey　gorilla　orangutan　dog　guide_dog　service_dog　poodle　
        wolf　fox_face　raccoon　cat　lion_face　tiger　leopard　horse　racehorse　
        green_apple　pear　peach　cherries　strawberry　kiwifruit　tomato　coconut　
        unicorn_face　zebra_face　deer　cow　ox　water_buffalo　pig　boar　pig_nose　ram　
        hippopotamus　mouse　rat　hamster　rabbit　chipmunk　hedgehog　bat　bear　koala　
        vampire　merperson　merman　mermaid　elf　genie　zombie　massage　haircut　
        panda_face　sloth　otter　skunk　kangaroo　badger　feet　turkey　chicken　rooster　
        hatching_chick　baby_chick　hatched_chick　bird　penguin　dove_of_peace　eagle　
        dragon_face　dragon　sauropod　t-rex　whale　dolphin　fish　tropical_fish　
        blowfish　shark　octopus　shell　snail　butterfly　bug　ant　bee　beetle　cricket　
        white_flower　rosette　rose　wilted_flower　hibiscus　sunflower　blossom　tulip　
        shamrock　four_leaf_clover　maple_leaf　fallen_leaf　leaves　anger　boom　dizzy　
        grapes　melon　watermelon　tangerine　lemon　banana　pineapple　mango　apple　
        green_apple　pear　peach　cherries　strawberry　kiwifruit　tomato　coconut　
        avocado　eggplant　potato　carrot　corn　hot_pepper　cucumber　leafy_green　
        broccoli　garlic　onion　mushroom　peanuts　chestnut　bread　croissant　
        baguette_bread　pretzel　bagel　pancakes　waffle　cheese_wedge　meat_on_bone　
        poultry_leg　cut_of_meat　bacon　hamburger　fries　pizza　hotdog　sandwich　taco　
        burrito　stuffed_flatbread　falafel　egg　fried_egg　shallow_pan_of_food　stew　
        bowl_with_spoon　green_salad　popcorn　butter　salt　canned_food　bento　
        rice_cracker　rice_ball　rice　curry　ramen　spaghetti　sweet_potato　oden　
        princess　angel　santa　superhero　supervillain　mage　fairy　
        sushi　fried_shrimp　fish_cake　moon_cake　dango　dumpling　fortune_cookie　
        takeout_box　crab　lobster　shrimp　squid　oyster　icecream　shaved_ice　
        ice_cream　doughnut　cookie　birthday　cake　cupcake　pie　chocolate_bar　candy　
        lollipop　custard　honey_pot　baby_bottle　glass_of_milk　coffee　tea　sake　
        champagne　wine_glass　cocktail　tropical_drink　beer　beers　clinking_glasses　
        tumbler_glass　cup_with_straw　beverage_box　mate_drink　ice_cube　chopsticks　
        knife_fork_plate　fork_and_knife　spoon　hocho　ampho　dash　hole　bomb　zzz　
        grapes　melon　watermelon　tangerine　lemon　banana　pineapple　mango　apple　
        avocado　eggplant　potato　carrot　corn　hot_pepper　cucumber　leafy_green　
        seedling　evergreen_tree　deciduous_tree　palm_tree　cactus　ear_of_rice　herb　
        broccoli　garlic　onion　mushroom　peanuts　chestnut　bread　croissant　
        spider　spider_web　scorpion　mosquito　microbe　bouquet　cherry_blossom
      </h1>
      <Container
        maxWidth="sm"
        style={{
          height: "100vh",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>
          {emojis.map((emoji, index) => (
            <RenderEmoji key={index} emoji={emoji} isOnly={false} />
          ))}
          <RenderEmoji emoji={emoji} isOnly={true} />
        </div>

        <h1>input emoji name</h1>

        <TextField
          value={typingString}
          onChange={(e) => setTypingString(e.target.value)}
          variant="outlined"
        />
      </Container>
    </ThemeProvider>
  );
}

export default App;
