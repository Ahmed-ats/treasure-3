import React from 'react';
import "./chat.css";



const Chat = (props) => {


    return (
        <div id="frame">
	<div id="sidepanel">
		<div id="profile">
			<div class="wrap">
				<img id="profile-img" src="http://emilcarlsson.se/assets/mikeross.png" class="online" alt="" />
				<p>Ghaidan Alhubaishi</p>
				<i class="fa fa-chevron-down expand-button" aria-hidden="true"></i>
				<div id="status-options">
					<ul>
						<li id="status-online" class="active"><span class="status-circle"></span> <p>Online</p></li>
						<li id="status-away"><span class="status-circle"></span> <p>Away</p></li>
						<li id="status-busy"><span class="status-circle"></span> <p>Busy</p></li>
						<li id="status-offline"><span class="status-circle"></span> <p>Offline</p></li>
					</ul>
				</div>
				<div id="expanded">
					<label for="twitter"><i class="fa fa-facebook fa-fw" aria-hidden="true"></i></label>
					<input name="twitter" type="text" value="mikeross" />
					<label for="twitter"><i class="fa fa-twitter fa-fw" aria-hidden="true"></i></label>
					<input name="twitter" type="text" value="ross81" />
					<label for="twitter"><i class="fa fa-instagram fa-fw" aria-hidden="true"></i></label>
					<input name="twitter" type="text" value="mike.ross" />
				</div>
			</div>
		</div>
		<div id="search">
			<label for=""><i class="fa fa-search" aria-hidden="true"></i></label>
			<input type="text" placeholder="Search contacts..." />
		</div>
		<div id="contacts">
			<ul>
				<li class="contact">
					<div class="wrap">
						<span class="contact-status"></span>
						<img src="http://emilcarlsson.se/assets/haroldgunderson.png" alt="" />
						<div class="meta">
							<p class="name">Harold Gunderson</p>
							<p class="preview">Thanks Mike! :)</p>
						</div>
					</div>
				</li>
				<li class="contact">
					<div class="wrap">
						<span class="contact-status"></span>
						<img src="http://emilcarlsson.se/assets/charlesforstman.png" alt="" />
						<div class="meta">
							<p class="name">Charles Forstman</p>
							<p class="preview">Mike, this isn't over.</p>
						</div>
					</div>
				</li>
				<li class="contact">
					<div class="wrap">
						<span class="contact-status"></span>
						<img src="http://emilcarlsson.se/assets/jonathansidwell.png" alt="" />
						<div class="meta">
							<p class="name">Jonathan Sidwell</p>
							<p class="preview"><span>You:</span> That's bullshit. This deal is solid.</p>
						</div>
					</div>
				</li>
			</ul>
		</div>
		<div id="bottom-bar">
			<button id="addcontact"><i class="fa fa-user-plus fa-fw" aria-hidden="true"></i> <span>Add contact</span></button>
			<button id="settings"><i class="fa fa-cog fa-fw" aria-hidden="true"></i> <span>Settings</span></button>
		</div>
	</div>
	<div class="content">
		<div class="contact-profile">
			<img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
			<p>Harvey Specter</p>
			<div class="social-media">
				<i class="fa fa-facebook" aria-hidden="true"></i>
				<i class="fa fa-twitter" aria-hidden="true"></i>
				 <i class="fa fa-instagram" aria-hidden="true"></i>
			</div>
		</div>
		<div class="messages">
			<ul>
				<li class="sent">
					<img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
					<p>Hi, is this item still available? I am interested</p>
				</li>
				<li class="replies">
					<img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
					<p>Hello, yes it is. When would you like to come for it?</p>
				</li>
				<li class="sent">
					<img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
					<p>How about this afternoon?</p>
				</li>
				<li class="replies">
					<img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
					<p>Yes, that works for me!</p>
				</li>
				<li class="replies">
					<img src="http://emilcarlsson.se/assets/harveyspecter.png" alt="" />
					<p>See you this afternoon!</p>
				</li>
				<li class="sent">
					<img src="http://emilcarlsson.se/assets/mikeross.png" alt="" />
					<p>See you then!</p>
				</li>
			</ul>
		</div>
		<div class="message-input">
			<div class="wrap">
			<input type="text" placeholder="Write your message..." />
			<i class="fa fa-paperclip attachment" aria-hidden="true"></i>
			<button class="submit"><i class="fa fa-paper-plane" aria-hidden="true"></i></button>
			</div>
		</div>
	</div>
</div>
    )
};

export default Chat;