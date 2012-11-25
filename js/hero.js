//########################################
// Contains hero class and hero functions.
//########################################

// Our main hero
function Hero(x, y){
    var self = this; // pointer on current hero instance

    // coordinates
    this.x = x;
    this.y = y;

    this.HP = 100;

    this.Width = heroWidth;
    this.Height = heroHeight;

    // hero states
    this.IsRunning = false;
    this.IsJumping = false;
    this.IsConfused = false;
    this.IsInvulnerable = false;

    // timeouts
    this.confuseTimeout = 0;
    this.invurableTimeout = 0;

    // hero speeds
    this.SpeedY = 0;
    this.SpeedX = maxSpeedX;

    // direction for moving
    this.direction = 'right';

    // current frame for drawing
    this.currentFrame = 0;

    // bonuses
    this.umbrella = true;
    this.slowing = true;
    this.jolt = true;
    this.life = true;
    this.stun = true;

    // texture for run left
    self.runLeftTexture = new Image();
    self.runLeftTexture.src = 'img/RunLeft.png';

    // texture for run right
    self.runRightTexture = new Image();
    self.runRightTexture.src = 'img/RunRight.png';

    // texture for run left (God mode)
    self.invulnerableRunLeftTexture = new Image();
    self.invulnerableRunLeftTexture.src = 'img/InvulnerableRunLeft.png';

    // texture for run right (invurable)
    self.invulnerableRunRightTexture = new Image();
    self.invulnerableRunRightTexture.src = 'img/InvulnerableRunRight.png';

    // texture for idle
    self.idleTexture = new Image();
    self.idleTexture.src = 'img/Idle.png';

    // texture for confuse
    self.confuseTexture = new Image();
    self.confuseTexture.src = 'img/Confuse.png';

    // Drawing hero
    this.DrawHero = function (ctx)
    {
        self.currentFrame = (self.currentFrame+1)%frameCount;
        if(self.IsConfused)
            ctx.drawImage(self.confuseTexture, 0, 0, 34, 42, self.x, self.y, heroWidth, heroHeight);
        else {
            if( !self.IsRunning )
                ctx.drawImage(self.idleTexture, 0, 0, 34, 42, self.x, self.y, heroWidth, heroHeight);
            else{
                if(!self.IsInvulnerable)
                {
                    if(self.direction == 'left')
                        ctx.drawImage (self.runLeftTexture, frameWidth * self.currentFrame, 0,
                            34, 42, self.x, self.y, heroWidth, heroHeight);
                    else
                    {
                        ctx.drawImage (self.runRightTexture, frameWidth * self.currentFrame, 0,
                            34, 42, self.x, self.y, heroWidth, heroHeight);
                    }
                }
                else
                {
                    if(self.direction == 'left')
                        ctx.drawImage (self.invulnerableRunLeftTexture, frameWidth * self.currentFrame, 0,
                            34, 42, self.x, self.y, heroWidth, heroHeight);
                    else
                    {
                        ctx.drawImage (self.invulnerableRunRightTexture, frameWidth * self.currentFrame, 0,
                            34, 42, self.x, self.y, heroWidth, heroHeight);
                    }
                }
            }
        }
    };

    // hero gravity
    this.Update = function ()
    {
        //------ gravity ---------
        var tempY = self.y;
        tempY -= self.SpeedY;
        tempY += gravity;

        if(tempY <= height - self.Height)
        {
            self.y = tempY;
            self.SpeedY -= fallingLambda;
        }
        else
        {
            self.y = height - self.Height;
            self.IsJumping = false;
        }
        //-------------------------

        // ------- confusing ------

        if(self.confuseTimeout > 0)
        {
            self.IsConfused = true;
            self.confuseTimeout -= 40;
        }
        else
        {
            self.IsConfused = false;
            self.confuseTimeout = 0;
        }

        // ------------------------

        // ------- invurable ------

        if(self.invurableTimeout > 0)
        {
            self.IsInvulnerable = true;
            self.invurableTimeout -= 40;
        }
        else
        {
            self.IsInvulnerable = false;
            self.invurableTimeout = 0;
        }

        // ------------------------

    };

    // hero confuse
    this.Confuse = function (timespan)
    {
        self.confuseTimeout = timespan;
    }

    // hero jumping
    this.Jump = function()
    {
        if(!self.IsJumping && !self.IsConfused)
        {
            self.SpeedY = maxSpeedY;
            self.IsJumping = true;
        }
    }

    // hero moving
    this.Move = function(direction){
        if(!self.IsConfused)
        {
            self.y -= self.SpeedY;
            self.direction = direction;

            if(self.IsRunning){
                if(direction == 'left' && self.x > 0)
                {
                    self.x -= maxSpeedX;
                }
                if(direction == 'right' && self.x < width - heroWidth)
                {
                    self.x += maxSpeedX;
                }
            }
        }
    }

    this.Invulnerable = function(){
        if(self.umbrella)
        {
            self.invurableTimeout = 10000;
            self.IsConfused = false;
            self.confuseTimeout = 0;
            self.umbrella = false;
            jQuery('#invulnerability').attr('disabled','disabled');
        }
    }

    this.Slow = function() {
        if(self.slowing)
        {
            gameLevel /= 2;
            self.slowing = false;
            jQuery('#slow').attr('disabled','disabled');
        }
    }

    this.Jolt = function() {
        if(self.jolt)
        {
            Enumerable.From(apples).ForEach(function(apple)
            {
                if(apple.isDrawing)
                {
                    apple.isFalling = true;
                }
            });
            self.jolt = false;
            jQuery('#jolt').attr('disabled','disabled');
        }
    }

    this.Life = function() {
        if(self.life)
        {
            self.HP = 100;
            self.life = false;
            jQuery('#life').attr('disabled','disabled');
        }
    }

    this.Stun = function() {
        if(self.stun)
        {
            self.IsConfused = false;
            self.confuseTimeout = 0;
            self.stun = false;
            jQuery('#stun').attr('disabled','disabled');
        }
    }
}