#!/bin/bash

RPC="https://initia-testnet.rpc.kjnodes.com:443"
mkdir -p ./deploy
chmod -R 777 ./deploy

# initiad q mstaking validators -oj --limit=1000 |  jq '.validators[] | select(.status=="BOND_STATUS_BONDED")' | jq -r '[.operator_address,.description.moniker] | join(" ")' > val.txt
/usr/local/bin/initiad q mstaking validators -oj --limit=2000 --node $RPC |  jq '.validators[] | select(.status=="BOND_STATUS_BONDED")' | jq -r '.operator_address' > val_list.txt


cat ./wallet_name_addr.txt | head -n 3 | while read wallet_name wallet_addr wallet_seedphrase; do 
	
	########### Import wallet ###########
	echo "$wallet_seedphrase" | /usr/local/bin/initiad keys add $wallet_name --recover

	########### Task 2 - MINT DOMAIN ##############
	# Register domain
	# sed "s/YOUR_SEED_PHRASE/$wallet_seedphrase/g;s/YOUR_DOMAINNAME/$wallet_name/g" register_domain_template.js > ./deploy/register_domain.js
	# node ./deploy/register_domain.js

	# Set primary domain
	# sed "s/YOUR_SEED_PHRASE/$wallet_seedphrase/g;s/YOUR_DOMAINNAME/$wallet_name/g" register_domain_template_2.js > ./deploy/register_domain_2.js
	# node ./deploy/register_domain_2.js

        ########### Task 3 - SWAP INIT to another ASSET ##############
	# sed "s/YOUR_SEED_PHRASE/$wallet_seedphrase/g" swap_template.js > ./deploy/swap.js
	# node ./deploy/swap.js
		
	########### Task 5 - STAKE INIT_LP to VALIDATOR ###########
	# Select validator randomly
	# RANDOM_VAL_NO=$(awk -v min=1 -v max=30 'BEGIN{srand(); print min+rand()*(max-min)}' | awk '{printf "%.0f\n", $0}'); 
	# SEL_VAL=$(cat ./val_list.txt | head -n $RANDOM_VAL_NO | tail -n 1)

	# Stake 1 USDC of pair INIT-USDC
	# sed "s/YOUR_SEED_PHRASE/$wallet_seedphrase/g;s/YOUR_VALIDATOR_ADDR/$SEL_VAL/g" stake_single_asset_template.js > ./deploy/stake_single_asset.js
	# node ./deploy/stake_single_asset.js

	########### Task 4 - STAKE INIT to a VALIDATOR ###########
	# Select validator randomly
        # RANDOM_VAL_NO=$(awk -v min=1 -v max=2 'BEGIN{srand(); print min+rand()*(max-min)}' | awk '{printf "%.0f\n", $0}');
        # SEL_VAL=$(cat ./val_list.txt | head -n $RANDOM_VAL_NO | tail -n 1)

	# /usr/local/bin/initiad tx mstaking delegate $SEL_VAL 10000uinit --from $wallet_addr --gas auto --fees 100000uinit -y; # 100000uinit,5000uusdc -y
	
	########### Task 6 - Claim staking reward ###########
	sleep 30;
	/usr/local/bin/initiad tx distribution withdraw-all-rewards --from $wallet_addr -y --gas auto --fees 100000uinit
	
	########### Mint all parts of Jennie NFT ###########
	# for (( part_no=0; part_no<=5; part_no++ )); do
	# 	sed "s/YOUR_SEED_PHRASE/$wallet_seedphrase/g;s/NFT_PART_NO/$part_no/g" mint_nft_part_template.js > ./deploy/mint_nft_part.js
	# 	node ./deploy/mint_nft_part.js
	# 	sleep 2;
	# done

	# ########### Mint NFT Jennie ###########
	# sed "s/YOUR_SEED_PHRASE/$wallet_seedphrase/g" mint_nft_jennie_template.js > ./deploy/mint_nft_jennie.js
	# node ./deploy/mint_nft_jennie.js

done	
