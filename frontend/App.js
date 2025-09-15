import React, { useState } from 'react';
import { View, Text, Button, TextInput, ActivityIndicator } from 'react-native';

export default function App() {
  const [text, setText] = useState('');
  const [status, setStatus] = useState('Ready');
  const [loading, setLoading] = useState(false);

  const startDubbing = async () => {
    setLoading(true);
    setStatus('Sending to backend...');
    try {
      // This calls backend /stt or /dubbing endpoints. Replace URL with workspace backend URL when running in Gitpod.
      const res = await fetch('http://localhost:8080/stt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      const data = await res.json();
      setStatus('Backend response: ' + (data.text || data.output || JSON.stringify(data)));
    } catch (e) {
      setStatus('Error: ' + e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex:1, padding:20, justifyContent:'center' }}>
      <Text style={{ fontSize:20, marginBottom:10 }}>Dubbing App (Demo)</Text>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Tulis teks untuk TTS / atau kosongkan untuk STT demo"
        style={{ height:40, borderColor:'#ccc', borderWidth:1, marginBottom:10, padding:8 }}
      />
      <Button title="Start Dubbing" onPress={startDubbing} />
      {loading ? <ActivityIndicator style={{ marginTop:10 }} /> : <Text style={{ marginTop:10 }}>{status}</Text>}
    </View>
  );
}
