/**
 * Created by uuuu on 2/12/2018.
 */

$(document).ready(function () {

    // getRaceText();


    var typingText = '';

    $.get('/getRandomText', function (data) {

        document.getElementById("startButton").focus();
        $(document).on('click', '#startButton', startRace);

        // typingText += "asdf asdf";
        typingText += data;
        $('.workingText').text(typingText);
        var wordsArray = typingText.split(" ");
        for (var i = 0; i < wordsArray.length - 1; i++) {
            console.log(i);
            wordsArray[i] += " ";
        }

        var counter = 0;
        //index of the starting word. Either beginning, or up to last correct word wordInTextIndex.
        //don't forget to add spaces manually
        var wITindex = 0;


        var justStarted = true;
        var startTime;
        var raceFinished = false;
        var timeCounter;

        //arrays for storing keystrokes info
        var keyPairs = [];
        var strokesTimes = [];
        var words = [];

        var prevKeyPair;
        var keyPair;
        var mistakesCounter = 0;

        var madeMistake;

        $(document).on('keyup', '#word', function (e) {

            //kickstart racing time counter and time between keystrokes counter
            if (justStarted === true) {
                startTime = new Date();
                timeCounter = new Date();
                justStarted = false;
            }


            //recording time between previous keyup and this one
            var keystrokeTime = new Date() - timeCounter;
            timeCounter = new Date();

            var currentWord = wordsArray[counter];

            var typedLetters = $('#word').val();
            //cutting current word to the length of word entered. Example:word from array is: "telephone",
            //letters entered to #word for now are "teleph"

            var nextLetterIndex = wITindex + typedLetters.length;

            var timeSinceStart = new Date() - startTime;
            var time = new Date(timeSinceStart);
            var secondsSinceStart = time.getSeconds();
            var currentCPM = (nextLetterIndex / secondsSinceStart * 60).toFixed(0);
            // "CPM: " + (typingText.length / seconds * 60)
            console.log(currentCPM);
            if (!madeMistake && currentCPM !== "Infinity" && nextLetterIndex > 2) {
                $('.averageSpeed').replaceWith('<p class="averageSpeed">CPM at the moment: ' + currentCPM + '</p>')
            } else if (currentCPM === "Infinity") {
                $('.averageSpeed').replaceWith('<p class="averageSpeed">CPM at the moment:</p>')

            }

            //piece of correct word, which lenght equals to typed letters, no matter if they are right or wrong
            var tempWord = currentWord.substring(0, typedLetters.length);

            if (tempWord === typedLetters) {

                madeMistake = false;

                if (event.which !== 16) {
                    if (nextLetterIndex > 4 && nextLetterIndex < typingText.length - 1) {
                        console.log('[' + typingText.charAt(nextLetterIndex - 2) + '] ' +
                            '[' + typingText.charAt(nextLetterIndex - 1) + '] ' + '[' +
                            keystrokeTime + ']');


                        prevKeyPair = keyPair;
                        keyPair = typingText.charAt(nextLetterIndex - 2) + typingText.charAt(nextLetterIndex - 1);
                        keyPairs[keyPairs.length] = keyPair;
                        strokesTimes[strokesTimes.length] = keystrokeTime;
                        words[words.length] = currentWord;

                        if (typingText.charAt(nextLetterIndex - 2) !== " " &&
                            typingText.charAt(nextLetterIndex - 1) !== " " &&
                            keyPair !== prevKeyPair) {
                            console.log(prevKeyPair);
                            console.log(keyPair);
                            createLetterPair(keystrokeTime, currentWord, keyPair);
                        }
                    }
                }

                //all text we went through up till this point
                var textBefore = typingText.substring(0, nextLetterIndex);
                //text after
                var textAfter = typingText.substring(nextLetterIndex + 1, typingText.length);
                //letter we are working with at given moment
                var currentLetter = typingText.substring(nextLetterIndex, nextLetterIndex + 1);
                $('.workingText').replaceWith(replaceTags(textBefore, currentLetter, textAfter));

                //counting mistakes, but if you made mistake, did't correct it, and enter another character, counter
                //won't respond
            } else if (tempWord !== typedLetters && event.which !== 17 && event.which !== 8) {
                if (!madeMistake) {
                    mistakesCounter++;
                    madeMistake = true;
                }

                $('.mistakes').replaceWith("<p class=\"mistakes\">Mistakes: " + mistakesCounter + "</p>");
            }

            var $foo = $('.workingText').prop('outerHTML');
            //how the end of text should look when we entered all letters correctly.
            //це дуже жестокій костиль, але я вже задовбався


            $foo = $foo.replace(/\r/, '');
            $foo = $foo.replace(/\n/, '');

            var i = '<span class="underlined"></span><div></div></div>';
            console.log($foo.slice(i.length * -1));

            if ($foo.slice(i.length * -1) === i && raceFinished === false) {
                var currentTime = new Date();
                var finishTime = currentTime - startTime;
                raceFinished = true;
                $('#word').prop('disabled', true).val('');
                showRaceTime(finishTime);
            }
            var typedLettersNoSpace = typedLetters.slice(0, -1);
            var lastChar = typedLetters.slice(-1);

            if (currentWord === typedLetters && lastChar === " ") {
                counter++;

                //counting idex for highlighting next letter to input. +1 because we need to consider spaces
                wITindex += typedLetters.length;

                $('#word').val('');
            }

            if (madeMistake) $('#word').addClass("wrong");
            if (!madeMistake) $('#word').removeClass("wrong");
        });

        function showRaceTime(t) {
            var ms = t;
            var d = new Date(ms);
            $('#timeResult').prop('hidden', false);
            $('#timeResult').replaceWith("<p class=\"margin\">Race time: "
                + d.getMinutes() + ":" + d.getSeconds() +
                ".<span class=\"milliseconds\">" + d.getMilliseconds() % 100 + "</span></p>");

            //just quantity of seconds. ex: if minute and 20 sec, it's simply 80 sec
            var seconds = d.getMinutes() * 60 + d.getSeconds();
            console.log(seconds);
            $('#cpm').prop('hidden', false).text("CPM: " + (typingText.length / seconds * 60).toFixed(0));
            $('#wpm').prop('hidden', false).text("WPM: " + (wordsArray.length / seconds * 60).toFixed(0));
            $('.averageSpeed').replaceWith('<p class="averageSpeed"></p>');

            for (var i = 0; i < keyPairs.length; i++) {
                console.log(keyPairs[i]);
                console.log(strokesTimes[i]);
                console.log(words[i]);
            }

            //showing graph stats
            var limit = 10000;    //increase number of dataPoints by increasing the limit
            var y = 100;
            var data = [];
            var dataSeries = { type: "line" };
            var dataPoints = [];
            for (var i = 0; i < limit; i += 1) {
                y += Math.round(Math.random() * 10 - 5);
                dataPoints.push({
                    x: i,
                    y: y
                });
            }
            dataSeries.dataPoints = dataPoints;
            data.push(dataSeries);

//Better to construct options first and then pass it as a parameter
            var options = {
                zoomEnabled: true,
                animationEnabled: true,
                title: {
                    text: "Try Zooming - Panning"
                },
                axisY: {
                    includeZero: false
                },
                data: data  // random data
            };

            $("#chartContainer").CanvasJSChart(options);
        }

        function replaceTags(a, b, c) {
            if (b.charCodeAt(0) === 10) {
                return "<div class=\"workingText\">" + a + "<span class=\"underlined\"></span><div>";
            }
            return "<div class=\"workingText\">" + a + "<span class=\"underlined\">" + b + "</span>" + c + "<div>";
        }

        //prevents repeatable start of race
        var alreadyStarted = false;

        function startRace() {



            if (alreadyStarted) return;
            $('#word').prop('disabled', false);
            document.getElementById("word").focus();
            alreadyStarted = true;
        }

        function createLetterPair(lettersTime, lettersWord, pair) {

            $.ajax({
                url: "/letters/" + lettersTime + "/" + lettersWord + "/" + pair,
                type: "POST",

                success: function (data) {
                    alert("Letter pair successfully json-ed");
                },
                error: function () {
                    // console.log("Something wrong");
                }
            })
        }

        function getRaceText() {
            $.ajax({
                url: "/getRandomText",
                type: "GET",
                dataType: "text",


                success: function (data) {
                    var html = '';
                    html += data;
                    $('.workingText').html(html);
                    console.log($('.workingText').text());
                    typingText += data;
                },
                error: function () {
                }
            })

        }

    });

});
