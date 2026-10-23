import React, { useEffect, useState } from 'react';

export default function App() {
  const [balance, setBalance] = useState(1250);
  const [rate, setRate] = useState(2);
  const [lastClaim, setLastClaim] = useState('');
  const [message, setMessage] = useState('Welcome to Kryvexora. This is a demo build.');

  useEffect(() => {
    const timer = setInterval(() => setBalance(v => v + rate), 5000);
    return () => clearInterval(timer);
  }, [rate]);

  function dailyReward() {
    const today = new Date().toISOString().slice(0, 10);
    if (lastClaim === today) {
      setMessage('Your demo daily reward has already been claimed today.');
      return;
    }
    setLastClaim(today);
    setBalance(v => v + 250);
    setMessage('Demo daily reward: +250 KXC.');
  }

  function upgrade() {
    const cost = rate * 500;
    if (balance < cost) return setMessage(`You need ${cost.toLocaleString()} KXC for this demo upgrade.`);
    setBalance(v => v - cost);
    setRate(v => v + 1);
    setMessage(`Demo upgrade complete. Mining rate is now ${rate + 1} KXC per 5 seconds.`);
  }

  return <main className="shell">
    <header className="top">
      <div className="logo">K</div>
      <div><p className="eyebrow">VIRTUAL MINING UNIVERSE</p><h1>KRYVEXORA</h1></div>
      <span className="pill">● DEMO</span>
    </header>
    <section className="hero">
      <div className="orbit"></div><div className="crystal">✦</div>
      <p className="eyebrow">YOUR MINING BALANCE</p>
      <div className="balance">{balance.toLocaleString()} <small>KXC</small></div>
      <p className="muted">Virtual game coins · not cryptocurrency</p>
      <div className="rate"><span>Mining speed</span><b>⚡ {rate} KXC / 5 sec</b></div>
    </section>
    <div className="notice">ⓘ &nbsp; Demo only: balance is held in this browser and is not real money or a guaranteed payout.</div>
    <section className="actions">
      <button onClick={dailyReward}><span className="icon">🎁</span><span><b>Daily reward</b><small>Claim +250 demo KXC</small></span><em>›</em></button>
      <button onClick={() => setMessage('AdsGram is not connected. This button does not show an ad or award coins yet.')}><span className="icon">▶</span><span><b>Watch an ad</b><small>AdsGram connection pending</small></span><em>›</em></button>
      <button onClick={upgrade}><span className="icon">⚙</span><span><b>Upgrade miner</b><small>Increase your demo mining rate</small></span><em>›</em></button>
    </section>
    <section className="stats"><div><small>MINING STATUS</small><b><i></i> Active (demo)</b></div><div><small>REFERRALS</small><b>Coming soon</b></div></section>
    <section className="message"><small>SYSTEM MESSAGE</small><p>{message}</p></section>
    <nav><button className="active" onClick={() => setMessage('Mining dashboard selected.')}>◈<small>Mine</small></button><button onClick={() => setMessage('Missions and referrals will be added in a later build.')}>✧<small>Missions</small></button><button onClick={() => setMessage('Leaderboard will be added after backend setup.')}>♜<small>Ranks</small></button><button onClick={() => setMessage('Account and secure profile features are not configured yet.')}>◉<small>Profile</small></button></nav>
    <footer>KRYVEXORA · BUILD 0.1.0 · DEMO ONLY</footer>
  </main>;
}
